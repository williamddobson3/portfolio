// Halftone Post-Processing Shader
uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uScale;
uniform float uIntensity;

varying vec2 vUv;

// Halftone dot pattern
float halftoneDot(vec2 uv, float intensity, float scale) {
  vec2 p = fract(uv * scale) - 0.5;
  float r = length(p);
  float threshold = intensity * 0.5;
  return step(threshold, r);
}

// Halftone line pattern
float halftoneLine(vec2 uv, float intensity, float scale) {
  float y = fract(uv.y * scale);
  float threshold = intensity * 0.5;
  return step(threshold, y);
}

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  
  // Calculate luminance
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  
  // Apply halftone pattern
  float pattern = halftoneDot(vUv, luminance, uScale);
  
  // Mix original color with halftone pattern
  vec3 halftoneColor = mix(color.rgb, vec3(pattern), uIntensity);
  
  gl_FragColor = vec4(halftoneColor, color.a);
}
