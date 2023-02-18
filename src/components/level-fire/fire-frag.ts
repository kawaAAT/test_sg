export default `
  #define MAGIC_NUMBER 43758.5453123

  varying vec2 vTextureCoord;
  uniform float time;

  float random (vec2 st) {
      float s = dot(st, vec2(0.400,0.230));
      return -1. + 2. * fract(sin(s) * MAGIC_NUMBER);
  }

  vec2 random2(vec2 st){
      vec2 s = vec2(
        dot(st, vec2(127.1,311.7)),
        dot(st, vec2(269.5,183.3))
      );
      return -1. + 2. * fract(sin(s) * MAGIC_NUMBER);
  }

  vec2 scale (vec2 p, float s) {
      return p * s;
  }

  float interpolate (float t) {
      //return t;
      // return t * t * (3. - 2. * t); // smoothstep
      return t * t * t * (10. + t * (6. * t - 15.)); // smootherstep
  }

  vec4 valueNoise (vec2 p) {
      vec2 i = floor(p);

      float f11 = random(i + vec2(0., 0.));
      float f12 = random(i + vec2(0., 1.));
      float f21 = random(i + vec2(1., 0.));
      float f22 = random(i + vec2(1., 1.));
      
      return vec4(f11, f12, f21, f22);
  }

  vec4 gradientNoise (vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);

      float f11 = dot(random2(i + vec2(0., 0.)), f - vec2(0., 0.));
      float f12 = dot(random2(i + vec2(0., 1.)), f - vec2(0., 1.));
      float f21 = dot(random2(i + vec2(1., 0.)), f - vec2(1., 0.));
      float f22 = dot(random2(i + vec2(1., 1.)), f - vec2(1., 1.));
      
      return vec4(f11, f12, f21, f22);
  }

  float noise (vec2 p) {
      vec4 v = gradientNoise(p);
      //vec4 v = valueNoise(p);
      
      vec2 f = fract(p);
      float t = interpolate(f.x);
      float u = interpolate(f.y);
      
      // linear interpolation 
      return mix(
          mix(v.x, v.z, t),
          mix(v.y, v.w, t), 
          u
      ) * .5 + .5;
  }


  float sdfCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main(void)
  {    
    vec2 uv = -1. + 2. * vTextureCoord;
    uv *= 2.;
    uv += vec2(0.7, 0.7 );

    float octaves1 = 3.0;
    float noiseAmount1 = noise(vec2(octaves1 * uv.x, octaves1 * uv.y + time));
    float yGradient1 = clamp(0., 0.6 - uv.y, 1.) * 0.3;
    vec2 sdfNoise1 = vec2(noiseAmount1 * .0, noiseAmount1 * 4.9 * yGradient1);
    vec2 p1 = (uv - vec2(-0.15, 0.5)) + sdfNoise1;
    p1 = p1 * vec2(0.8, 1.);
    vec4 color1 = vec4(step(sdfCircle(p1, 0.4), .0)) * vec4(1., .2, 0., 1.);
    
    float octaves2 = 6.0;
    float noiseAmount2 = noise(vec2(octaves2 * uv.x, octaves2 * uv.y + time));
    float yGradient2 = clamp(0., 0.5 - uv.y, 1.0) * 0.5;
    vec2 sdfNoise2 = vec2(noiseAmount2 * .0, noiseAmount2 * 2.8 * yGradient2);
    vec2 p2 = (uv - vec2(-0.15, 0.55)) + sdfNoise2;
    p2 = p2 * vec2(0.5, 0.8);
    vec4 color2 = vec4(step(sdfCircle(p2, 0.2), 0.)) * vec4(1., .5, 0., 1.);
    
    float octaves3 = 9.0;
    float noiseAmount3 = noise(vec2(octaves3 * uv.x, octaves3 * uv.y + time));
    float yGradient3 = clamp(0., 0.45 - uv.y, 1.0) * 0.45;
    vec2 sdfNoise3 = vec2(noiseAmount3 * .0, noiseAmount3 * 2.7 * yGradient3);
    vec2 p3 = (uv - vec2(-0.15, 0.5)) + sdfNoise3;
    p3 = p3 * vec2(0.28, .5);
    vec4 color3 = vec4(step(sdfCircle(p3, 0.05), 0.0)) * vec4(1., .9, 0., 1.);
    
    vec4 finalColor = vec4(0., 0., 0., 0.);
    if (color3.x > 0.) {
      finalColor = color3;
    }
    else if (color2.x > 0.) {
      finalColor = color2;
    }
    else if (color1.x > 0. ) {
      finalColor = color1;
    }
  
    gl_FragColor = finalColor;
  }
`