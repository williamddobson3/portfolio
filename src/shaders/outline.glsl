// Outline Shader (Inverted Hull Method)
// This shader is used for the outline mesh that's rendered behind the main geometry

uniform float uOutlineWidth;
uniform vec3 uOutlineColor;

varying vec3 vNormal;

void main() {
  // Simple outline rendering - the mesh is already scaled and positioned
  // by the vertex shader, so we just render it in the outline color
  gl_FragColor = vec4(uOutlineColor, 1.0);
}
