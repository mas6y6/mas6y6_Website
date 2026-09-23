<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import vertexShaderSource from "../shaders/neuralNoise.vert.glsl?raw";
import fragmentShaderSource from "../shaders/neuralNoise.frag.glsl?raw";

const holderRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let frameId: number | null = null;
let devicePixelRatio = 1;
let resizeTimer: number | null = null;

const pointer = {
  x: 0.5,
  y: 0.5,
  targetX: 0.5,
  targetY: 0.5,
};

interface UniformHandles {
  u_time: WebGLUniformLocation | null;
  u_ratio: WebGLUniformLocation | null;
  u_pointer_position: WebGLUniformLocation | null;
  u_scroll_progress: WebGLUniformLocation | null;
}

const state: { uniforms: UniformHandles; startTime: number } = {
  uniforms: {
    u_time: null,
    u_ratio: null,
    u_pointer_position: null,
    u_scroll_progress: null
  },
  startTime: 0,
};

const getWidth = () => window.innerWidth;
const getHeight = () => window.innerHeight;

const handlePointerMove = (event: { clientX: number; clientY: number; }) => {
  pointer.targetX = event.clientX / getWidth();
  pointer.targetY = 1 - event.clientY / getHeight();
};

const handleTouchMove = (event: TouchEvent) => {
  if (!event.touches?.length) return;
  const touch = event.touches[0];
  if (!touch) return;
  pointer.targetX = touch.clientX / getWidth();
  pointer.targetY = 1 - touch.clientY / getHeight();
};

onMounted(() => {
  if (!canvasRef.value) return;

  initContext();
  if (!gl) return;

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: true });
  window.addEventListener("resize", scheduleResize, { passive: true });
  window.addEventListener("orientationchange", scheduleResize, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleResize, { passive: true });

  state.startTime = performance.now();
  frameId = requestAnimationFrame(renderFrame);
  resizeCanvas();
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("resize", scheduleResize);
  window.removeEventListener("orientationchange", scheduleResize);
  window.visualViewport?.removeEventListener("resize", scheduleResize);

  if (resizeTimer) {
    window.clearTimeout(resizeTimer);
    resizeTimer = null;
  }

  if (frameId) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  if (gl && program) {
    gl.deleteProgram(program);
  }
  gl = null;
});

function initContext() {
  devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  const canvas = canvasRef.value;
  if (!canvas) return;

  gl =
      canvas.getContext("webgl", { antialias: true, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

  if (!gl) return;

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
  );
  if (!vertexShader || !fragmentShader) return;

  program = gl.createProgram();
  if (!program) return;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
        "Unable to initialise shader program:",
        gl.getProgramInfoLog(program),
    );
    program = null;
    return;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  gl.useProgram(program);
  const seed = Math.random() * 1000;
  const seedLocation = gl.getUniformLocation(program, 'u_seed');
  gl.uniform1f(seedLocation, seed);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
  );
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  state.uniforms = {
    u_time: gl.getUniformLocation(program, "u_time"),
    u_ratio: gl.getUniformLocation(program, "u_ratio"),
    u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
    u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
  };

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  resizeCanvas();
}

function compileShader(type: number, source: string): WebGLShader | null {
  if (!gl) return null;
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function scheduleResize() {
  resizeCanvas();
  if (resizeTimer) return;
  resizeTimer = window.setTimeout(() => {
    resizeTimer = null;
    resizeCanvas();
  }, 100);
}

function resizeCanvas() {
  if (!gl || !canvasRef.value) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const width = getWidth();
  const height = getHeight();

  const nextWidth = Math.max(1, Math.round(width * dpr));
  const nextHeight = Math.max(1, Math.round(height * dpr));

  if (
      canvasRef.value.width === nextWidth &&
      canvasRef.value.height === nextHeight &&
      devicePixelRatio === dpr
  ) {
    return;
  }

  devicePixelRatio = dpr;

  canvasRef.value.width = nextWidth;
  canvasRef.value.height = nextHeight;
  canvasRef.value.style.width = `${width}px`;
  canvasRef.value.style.height = `${height}px`;

  gl.viewport(0, 0, nextWidth, nextHeight);

  if (state.uniforms.u_ratio) {
    gl.uniform1f(state.uniforms.u_ratio, nextWidth / nextHeight);
  }
}

function renderFrame(now: number) {
  if (!gl || !program) return;

  pointer.x += (pointer.targetX - pointer.x) * 0.05;
  pointer.y += (pointer.targetY - pointer.y) * 0.05;

  const scrollMax = Math.max(
      document.body.scrollHeight - getHeight(),
      1,
  );
  const scrollProgress = Math.min(window.scrollY / scrollMax, 1);
  const elapsed = now - state.startTime;

  gl.uniform1f(state.uniforms.u_time, elapsed);
  gl.uniform2f(state.uniforms.u_pointer_position, pointer.x, pointer.y);
  gl.uniform1f(state.uniforms.u_scroll_progress, scrollProgress);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  frameId = requestAnimationFrame(renderFrame);
}
</script>

<template>
  <div class="background">
    <div ref="holderRef" class="absolute inset-0 pointer-events-none">
      <canvas ref="canvasRef" class="block" />
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
}
</style>