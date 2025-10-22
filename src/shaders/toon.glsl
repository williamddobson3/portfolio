// Toon Shading Fragment Shader
uniform vec3 uBaseColor;
uniform vec3 uLightDirection;
uniform int uToonLevels;
uniform float uAmbientIntensity;

varying vec3 vNormal;
varying vec3 vPosition;

// Toon level quantization function
float toonLevel(float value, int levels) {
  return floor(value * float(levels)) / float(levels);
}

// Main toon lighting calculation
vec3 toonLighting(vec3 baseColor, vec3 normal, vec3 lightDir, int levels) {
  float nDotL = max(dot(normal, lightDir), 0.0);
  float t = toonLevel(nDotL, levels);
  
  vec3 diffuse = baseColor * t;
  vec3 ambient = baseColor * uAmbientIntensity;
  
  return diffuse + ambient;
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(uLightDirection);
  
  vec3 color = toonLighting(uBaseColor, normal, lightDir, uToonLevels);
  
  gl_FragColor = vec4(color, 1.0);
}
