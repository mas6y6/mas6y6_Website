
precision mediump float;

varying vec2 vUv;

uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;
uniform float u_seed;

// ==========================================
// ROTATION
// ==========================================

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

// ==========================================
// NEURAL NOISE
// ==========================================

float neuro_shape(vec2 uv, float t, float p) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 6.7;

  for (int j = 0; j < 14; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);

    float seed = u_seed + float(j) * 12.9898;

    vec2 layer = uv * scale
    + float(j)
    + vec2(
            sin(seed),
            cos(seed * 1.37)
    )
    + sine_acc
    - t;

    sine_acc += sin(layer) + 2.1 * p;
    res += (0.5 + 0.5 * cos(layer)) / scale;

    scale *= 1.18;
  }

  return res.x + res.y;
}

// ==========================================
// COLOR PALETTE
// Blue -> Purple -> Indigo -> Blue
// ==========================================

vec3 themeColor(float progress) {
  vec3 blue   = vec3(0.075, 0.380, 0.949);
  vec3 purple = vec3(0.643, 0.075, 0.949);
  vec3 indigo = vec3(0.204, 0.075, 0.949);

  progress = fract(progress);

  float segment = progress * 3.0;
  float index = floor(segment);
  float amount = fract(segment);

  amount = smoothstep(0.0, 1.0, amount);

  if (index < 1.0) {
    return mix(blue, purple, amount);
  } else if (index < 2.0) {
    return mix(purple, indigo, amount);
  } else {
    return mix(indigo, blue, amount);
  }
}

// ==========================================
// MAIN
// ==========================================

void main() {
  vec2 uv = 0.3 * vUv;
  uv.x *= u_ratio;

  // JavaScript supplies milliseconds.
  float t = 0.00007 * u_time;

  // ==========================================
  // POINTER INFLUENCE (CENTERED)
  // ==========================================

  vec2 pointer = vUv - vec2(0.5);
  pointer.x *= u_ratio;

  float p = clamp(length(pointer), 0.0, 1.0);
  p = 0.18 * pow(1.0 - p, 2.4);

  // ==========================================
  // ORIGINAL NEURAL STRUCTURE
  // ==========================================

  float rawNoise = neuro_shape(uv, t, p);

  float noise = 0.95 * pow(rawNoise, 3.0);
  noise += 0.75 * pow(rawNoise, 5.0);
  noise = max(0.0, noise - 0.35);

  float vignette = smoothstep(
          1.08,
          0.8,
          length(vUv - 0.5)
  );

  float intensity = clamp(
          noise * vignette,
          0.0,
          0.9
  );

  // ==========================================
  // POROUS / SPONGE STRUCTURE
  // ==========================================

  // Generate a secondary noise field.
  // Different scale creates irregular cavities.
  float poreNoise = neuro_shape(
          uv * 2.2 + vec2(4.7, 2.3),
          t * 0.985,
          0.0
  );

  // Normalize the pore field.
  poreNoise = clamp(poreNoise / 1.8, 0.0, 1.0);

  // Create organic holes.
  float pores = smoothstep(
          0.30,
          0.58,
          poreNoise
  );

  // Apply holes to the neural structure.
  float porousIntensity = intensity * pores;

  // Glowing edges around the cavities.
  float poreEdges = 1.0 - smoothstep(
          0.30,
          0.43,
          abs(poreNoise - 0.30)
  );

  float edgeGlow = poreEdges * intensity * 0.35;

  // ==========================================
  // LIQUID COLOR FLOW
  // ==========================================

  float wave1 = sin(
          vUv.y * 5.0 +
          vUv.x * 2.0 -
          t * 1.8 +
          rawNoise * 2.0
  );

  float wave2 = sin(
          vUv.x * 4.0 -
          vUv.y * 3.0 +
          t * 1.2 +
          rawNoise * 1.5
  );

  // Spatial gradients mixed with neural noise.
  float colorPosition =
  vUv.x * 0.85 +
  vUv.y * 0.45 +
  rawNoise * 0.65 +
  wave1 * 0.12 +
  wave2 * 0.08 +
  t * 0.025;

  vec3 accent = themeColor(colorPosition);

  // ==========================================
  // COLOR COMPOSITION
  // ==========================================

  vec3 base = vec3(0.008, 0.012, 0.055);

  float colorStrength = smoothstep(
          0.02,
          0.65,
          porousIntensity
  );

  vec3 color = mix(
          base,
          accent,
          colorStrength
  );

  // Main neon glow.
  color += accent * pow(porousIntensity, 1.5) * 0.35;

  // Secondary illumination.
  color += accent * porousIntensity * 0.12;

  // Glowing cavity edges.
  color += accent * edgeGlow * 0.8;

  color = clamp(color, 0.0, 1.0);

  // ==========================================
  // TRANSPARENCY
  // ==========================================

  float alpha = smoothstep(
          0.0,
          0.95,
          porousIntensity
  ) * 0.75;

  gl_FragColor = vec4(color, alpha);
}
