// https://openbackgrounds.com

precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;

uniform float u_seed;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float p) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 6.5;

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

vec3 themeColor(float progress) {
  vec3 c1 = vec3(0.075, 0.380, 0.949); // #1361F2
  vec3 c2 = vec3(0.643, 0.075, 0.949); // #A413F2
  vec3 c3 = vec3(0.204, 0.075, 0.949); // #3413F2

  progress = fract(progress);

  float segment = progress * 3.0;
  float index = floor(segment);
  float amount = fract(segment);

  if (index < 1.0) {
    return mix(c1, c2, amount);
  } else if (index < 2.0) {
    return mix(c2, c3, amount);
  } else {
    return mix(c3, c1, amount);
  }
}

void main() {
  vec2 uv = 0.3 * vUv;
  uv.x *= u_ratio;

  vec2 pointer = vUv - u_pointer_position;
  pointer.x *= u_ratio;
  float p = clamp(length(pointer), 0., 1.);
  p = 0.18 * pow(1. - p, 2.4);

  float t = 0.00007 * u_time;
  float noise = neuro_shape(uv, t, p);

  noise = 0.95 * pow(noise, 3.);
  noise += 0.75 * pow(noise, 5.);
  noise = max(0.0, noise - 0.35);

  float vignette = smoothstep(1.08, 0.28, length(vUv - 0.5));
  float intensity = clamp(noise * vignette, 0.0, 1.0);

  vec3 base = vec3(0.04, 0.39, 0.18);

  float colorPosition =
  vUv.x * 1.5 +
  vUv.y * 0.5 +
  sin(vUv.y * 10.0 + t) * 0.15;

  vec3 accent = themeColor(colorPosition);

  vec3 blend = mix(
    base,
    accent,
    clamp(pow(intensity, 0.85), 0.0, 1.0)
  );

  vec3 color = mix(base, blend, 0.75)
  + accent * (intensity * 0.25);

  color = clamp(color, 0.0, 1.0);

  float alpha = smoothstep(0.0, 0.85, intensity) * 0.6;
  gl_FragColor = vec4(color, alpha);
}