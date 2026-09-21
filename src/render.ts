import { firefox, type Browser, type Page } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import process from "node:process";

interface RenderOptions {
    url: string;
    output: string;
    width: number;
    height: number;
    fps: number;
    duration: number;
    crf: number;
    speed: number;
}

function getArg(
    name: string,
    fallback: string
): string {
    const index =
        process.argv.indexOf(`--${name}`);

    if (index === -1) {
        return fallback;
    }

    return (
        process.argv[index + 1] ??
        fallback
    );
}

const options: RenderOptions = {
    url: getArg(
        "url",
        "http://127.0.0.1:4173/banner.html"
    ),

    output: getArg(
        "output",
        "dist/website.mp4"
    ),

    width: Number(
        getArg("width", "1920")
    ),

    height: Number(
        getArg("height", "1080")
    ),

    fps: Number(
        getArg("fps", "60")
    ),

    duration: Number(
        getArg("duration", "100")
    ),

    crf: Number(
        getArg("crf", "18")
    ),

    // 1.0 = normal speed
    // 0.5 = half speed
    // 0.25 = quarter speed
    speed: Number(
        getArg("speed", "0.1")
    ),
};

const totalFrames =
    Math.ceil(
        options.duration *
        options.fps
    );

let preview:
    ReturnType<typeof spawn> | undefined;

let browser:
    Browser | undefined;

let ffmpeg:
    ReturnType<typeof spawn> | undefined;

let cleaningUp = false;

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

if (
    !Number.isFinite(options.width) ||
    options.width <= 0
) {
    throw new Error(
        "Invalid width."
    );
}

if (
    !Number.isFinite(options.height) ||
    options.height <= 0
) {
    throw new Error(
        "Invalid height."
    );
}

if (
    !Number.isFinite(options.fps) ||
    options.fps <= 0
) {
    throw new Error(
        "Invalid FPS."
    );
}

if (
    !Number.isFinite(options.duration) ||
    options.duration <= 0
) {
    throw new Error(
        "Invalid duration."
    );
}

if (
    !Number.isFinite(options.crf) ||
    options.crf < 0 ||
    options.crf > 51
) {
    throw new Error(
        "CRF must be between 0 and 51."
    );
}

if (
    !Number.isFinite(options.speed) ||
    options.speed <= 0
) {
    throw new Error(
        "Speed must be greater than 0."
    );
}

// -----------------------------------------------------------------------------
// Header
// -----------------------------------------------------------------------------

console.log();
console.log("🎬 Website renderer");
console.log("-------------------");
console.log(`URL:        ${options.url}`);
console.log(`Output:     ${options.output}`);
console.log(`Resolution: ${options.width}×${options.height}`);
console.log(`FPS:        ${options.fps}`);
console.log(`Duration:   ${options.duration}s`);
console.log(`Speed:      ${options.speed}×`);
console.log(`Frames:     ${totalFrames}`);
console.log(`CRF:        ${options.crf}`);
console.log();

// -----------------------------------------------------------------------------
// Cleanup
// -----------------------------------------------------------------------------

async function cleanup(): Promise<void> {
    if (cleaningUp) {
        return;
    }

    cleaningUp = true;

    console.log();
    console.log("Cleaning up...");

    try {
        if (ffmpeg) {
            ffmpeg.stdin?.destroy();

            if (!ffmpeg.killed) {
                ffmpeg.kill();
            }
        }
    } catch {
        // Ignore cleanup errors.
    }

    try {
        if (preview) {
            if (!preview.killed) {
                preview.kill();
            }
        }
    } catch {
        // Ignore cleanup errors.
    }

    try {
        if (browser) {
            await browser.close();
        }
    } catch {
        // Ignore cleanup errors.
    }
}

// -----------------------------------------------------------------------------
// Signal handling
// -----------------------------------------------------------------------------

process.once(
    "SIGINT",
    async () => {
        console.log();
        console.log("Interrupted.");

        await cleanup();

        process.exit(130);
    }
);

process.once(
    "SIGTERM",
    async () => {
        await cleanup();

        process.exit(143);
    }
);

// -----------------------------------------------------------------------------
// Start Vite
// -----------------------------------------------------------------------------

console.log("Starting Vite...");

preview = spawn(
    "npx",
    [
        "vite",
        "--host",
        "127.0.0.1",
        "--port",
        "4173",
    ],
    {
        stdio: [
            "ignore",
            "pipe",
            "pipe",
        ],

        shell:
            process.platform ===
            "win32",
    }
);

let viteOutput = "";
let viteError = "";

preview.stdout?.on(
    "data",
    data => {
        viteOutput += data.toString();
    }
);

preview.stderr?.on(
    "data",
    data => {
        viteError += data.toString();
    }
);

// -----------------------------------------------------------------------------
// Wait for Vite
// -----------------------------------------------------------------------------

async function waitForServer(
    url: string,
    timeoutMs = 15_000
): Promise<void> {
    const start =
        Date.now();

    while (
        Date.now() - start <
        timeoutMs
        ) {
        if (
            preview?.exitCode !== null &&
            preview?.exitCode !== undefined
        ) {
            throw new Error(
                "Vite exited before the server became available.\n\n" +
                viteOutput +
                "\n" +
                viteError
            );
        }

        try {
            const response =
                await fetch(url);

            if (
                response.ok ||
                response.status === 304
            ) {
                return;
            }
        } catch {
            // Vite isn't ready yet.
        }

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    100
                )
        );
    }

    throw new Error(
        "Timed out waiting for Vite.\n\n" +
        viteOutput +
        "\n" +
        viteError
    );
}

await waitForServer(
    options.url
);

console.log(
    "✓ Vite is ready."
);

// -----------------------------------------------------------------------------
// Start Firefox
// -----------------------------------------------------------------------------

console.log(
    "Starting Firefox..."
);

browser =
    await firefox.launch({
        headless: true,
    });

const page =
    await browser.newPage({
        viewport: {
            width: options.width,
            height: options.height,
        },

        deviceScaleFactor: 1,

        colorScheme: "dark",
    });

// -----------------------------------------------------------------------------
// Load page
// -----------------------------------------------------------------------------

console.log(
    "Loading website..."
);

await page.goto(
    options.url,
    {
        waitUntil: "networkidle",
    }
);

// Give WebGL, images, fonts, etc. time to initialize.
await page.waitForTimeout(
    1000
);

// -----------------------------------------------------------------------------
// Force viewport dimensions
// -----------------------------------------------------------------------------

await page.evaluate(
    ({
         width,
         height,
     }) => {
        document.documentElement.style.width =
            `${width}px`;

        document.documentElement.style.height =
            `${height}px`;

        document.body.style.width =
            `${width}px`;

        document.body.style.height =
            `${height}px`;

        document.body.style.margin =
            "0";

        document.body.style.overflow =
            "hidden";
    },
    {
        width:
        options.width,
        height:
        options.height,
    }
);

// -----------------------------------------------------------------------------
// Verify viewport
// -----------------------------------------------------------------------------

const viewportInfo =
    await page.evaluate(() => ({
        innerWidth:
        window.innerWidth,

        innerHeight:
        window.innerHeight,

        devicePixelRatio:
        window.devicePixelRatio,
    }));

console.log(
    `Viewport:   ${viewportInfo.innerWidth}×${viewportInfo.innerHeight}`
);

console.log(
    `DPR:        ${viewportInfo.devicePixelRatio}`
);

if (
    viewportInfo.innerWidth !==
    options.width ||
    viewportInfo.innerHeight !==
    options.height
) {
    throw new Error(
        `Viewport size mismatch.\n` +
        `Expected: ${options.width}×${options.height}\n` +
        `Actual:   ${viewportInfo.innerWidth}×${viewportInfo.innerHeight}`
    );
}

// -----------------------------------------------------------------------------
// Check render hook
// -----------------------------------------------------------------------------

const hasRenderHook =
    await page.evaluate(
        () => {
            const win =
                window as unknown as {
                    __renderFrame?: (
                        time: number
                    ) => void;
                };

            return (
                typeof win.__renderFrame ===
                "function"
            );
        }
    );

if (hasRenderHook) {
    console.log(
        "✓ window.__renderFrame(time) detected."
    );
} else {
    console.log(
        "⚠ window.__renderFrame() not found."
    );

    console.log(
        "  Using requestAnimationFrame fallback."
    );
}

// -----------------------------------------------------------------------------
// FFmpeg
// -----------------------------------------------------------------------------

console.log(
    "Starting FFmpeg..."
);

const lastSlash =
    Math.max(
        options.output.lastIndexOf("/"),
        options.output.lastIndexOf("\\")
    );

const outputDirectory =
    lastSlash >= 0
        ? options.output.substring(
            0,
            lastSlash
        )
        : "";

if (outputDirectory) {
    await mkdir(
        outputDirectory,
        {
            recursive: true,
        }
    );
}

ffmpeg = spawn(
    "ffmpeg",
    [
        "-y",

        // PNG frames are streamed directly through stdin.
        "-f",
        "image2pipe",

        "-framerate",
        String(options.fps),

        "-i",
        "pipe:0",

        // H.264
        "-c:v",
        "libx264",

        "-preset",
        "medium",

        "-crf",
        String(options.crf),

        "-pix_fmt",
        "yuv420p",

        "-movflags",
        "+faststart",

        options.output,
    ],
    {
        stdio: [
            "pipe",
            "inherit",
            "pipe",
        ],
    }
);

let ffmpegError = "";

ffmpeg.stderr?.on(
    "data",
    data => {
        ffmpegError +=
            data.toString();
    }
);

ffmpeg.once(
    "error",
    error => {
        console.error();
        console.error(
            "FFmpeg process error:"
        );
        console.error(error);
    }
);

// -----------------------------------------------------------------------------
// Capture frame
// -----------------------------------------------------------------------------

async function captureFrame(
    page: Page,
    time: number
): Promise<Buffer> {
    await page.evaluate(
        async time => {
            const win =
                window as unknown as {
                    __renderTime?: number;

                    __renderFrame?: (
                        time: number
                    ) => void;
                };

            // Slow down the animation by controlling
            // the time passed into the page.
            win.__renderTime =
                time;

            // -------------------------------------------------------------
            // Preferred deterministic renderer.
            // -------------------------------------------------------------

            if (
                typeof win.__renderFrame ===
                "function"
            ) {
                win.__renderFrame(
                    time
                );

                return;
            }

            // -------------------------------------------------------------
            // Fallback for normal requestAnimationFrame animation.
            // -------------------------------------------------------------

            await new Promise<void>(
                resolve => {
                    requestAnimationFrame(
                        () => {
                            requestAnimationFrame(
                                () => {
                                    resolve();
                                }
                            );
                        }
                    );
                }
            );
        },
        time
    );

    // Capture the entire visible browser viewport.
    return page.screenshot({
        type: "png",

        fullPage: false,

        animations: "disabled",

        caret: "hide",

        scale: "device",
    });
}

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

console.log();
console.log(
    "Rendering..."
);
console.log();

const start =
    performance.now();

try {
    for (
        let frame = 0;
        frame < totalFrames;
        frame++
    ) {
        // ---------------------------------------------------------------------
        // The important part:
        //
        // Video time is normal:
        //
        //   0, 1/60, 2/60, 3/60...
        //
        // But the website's animation time is multiplied by `speed`.
        //
        // speed = 1.0 → normal
        // speed = 0.5 → half speed
        // speed = 0.25 → quarter speed
        // ---------------------------------------------------------------------

        const time =
            (frame /
                options.fps) *
            options.speed;

        const png =
            await captureFrame(
                page,
                time
            );

        if (
            !ffmpeg?.stdin
        ) {
            throw new Error(
                "FFmpeg stdin is unavailable."
            );
        }

        // ---------------------------------------------------------------------
        // Backpressure
        // ---------------------------------------------------------------------

        if (
            !ffmpeg.stdin.write(
                png
            )
        ) {
            await new Promise<void>(
                resolve => {
                    ffmpeg!.stdin!.once(
                        "drain",
                        resolve
                    );
                }
            );
        }

        // ---------------------------------------------------------------------
        // Progress
        // ---------------------------------------------------------------------

        const completed =
            frame + 1;

        const progress =
            (completed /
                totalFrames) *
            100;

        const elapsed =
            (performance.now() -
                start) /
            1000;

        const renderFps =
            completed /
            Math.max(
                elapsed,
                0.001
            );

        const remaining =
            (totalFrames -
                completed) /
            Math.max(
                renderFps,
                0.001
            );

        process.stdout.write(
            `\rFrame ${completed}/${totalFrames}` +
            ` | ${progress.toFixed(1)}%` +
            ` | ${renderFps.toFixed(1)} FPS` +
            ` | ETA ${remaining.toFixed(1)}s`
        );
    }

    console.log();
    console.log();

    console.log(
        "Finishing MP4..."
    );

    ffmpeg.stdin!.end();

    const exitCode =
        await new Promise<number>(
            resolve => {
                ffmpeg!.once(
                    "close",
                    code => {
                        resolve(
                            code ?? 1
                        );
                    }
                );
            }
        );

    if (
        exitCode !== 0
    ) {
        console.error();
        console.error(
            "❌ FFmpeg failed:"
        );

        console.error(
            ffmpegError
        );

        throw new Error(
            `FFmpeg exited with code ${exitCode}.`
        );
    }

    console.log();
    console.log(
        `✅ Render complete: ${options.output}`
    );

} finally {
    await cleanup();
}