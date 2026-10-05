"use client";

import { useEffect, useRef } from "react";

import "./Aurora.css";

const VERT = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y)
    ? vec2(1.0, 0.0)
    : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x
    + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 -
       0.85373472095314 *
       (a0 * a0 + h * h);

  vec3 g;

  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];

  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;

  COLOR_RAMP(colors, uv.x, rampColor);

  float height =
    snoise(
      vec2(
        uv.x * 2.0 + uTime * 0.1,
        uTime * 0.25
      )
    )
    * 0.5
    * uAmplitude;

  height = exp(height);

  height = uv.y * 2.0 - height + 0.2;

  float intensity = 0.6 * height;

  float midPoint = 0.20;

  float auroraAlpha = smoothstep(
    midPoint - uBlend * 0.5,
    midPoint + uBlend * 0.5,
    intensity
  );

  vec3 auroraColor = intensity * rampColor;

  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);

    float coverage = clamp(
      auroraAlpha * (0.55 + 0.45 * energy),
      0.0,
      0.86
    );

    vec3 chroma = pow(
      clamp(rampColor, 0.0, 1.0),
      vec3(1.2)
    );

    float chromaPeak =
      max(chroma.r, max(chroma.g, chroma.b));

    chroma /= max(chromaPeak, 0.0001);

    fragColor = vec4(
      mix(
        vec3(1.0),
        chroma,
        min(coverage * 1.08, 0.94)
      ),
      1.0
    );
  } else {
    fragColor = vec4(
      auroraColor * auroraAlpha,
      auroraAlpha
    );
  }
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
  lightMode?: boolean;
}

export default function Aurora(props: AuroraProps) {
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
    lightMode = false,
  } = props;

  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let disposeRenderer: (() => void) | undefined;

    void import("ogl").then(({ Renderer, Program, Mesh, Color, Triangle }) => {
      if (disposed) return;

      const ctn = ctnDom.current;
      if (!ctn) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, isMobile ? 0.75 : 1),
      });

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.canvas.style.backgroundColor = "transparent";

      let program: InstanceType<typeof Program> | undefined;

      const resize = () => {
        const width = Math.max(1, ctn.clientWidth);
        const height = Math.max(1, ctn.clientHeight);
        renderer.setSize(width, height);

        if (program) {
          program.uniforms.uResolution.value = [
            gl.drawingBufferWidth,
            gl.drawingBufferHeight,
          ];
        }
      };

      const geometry = new Triangle(gl);
      if (geometry.attributes.uv) delete geometry.attributes.uv;

      const createColorStops = (stops: string[]) =>
        stops.map((hex) => {
          const color = new Color(hex);
          return [color.r, color.g, color.b];
        });

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: createColorStops(colorStops) },
          uResolution: { value: [1, 1] },
          uBlend: { value: blend },
          uLightMode: { value: lightMode ? 1 : 0 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      ctn.appendChild(gl.canvas);

      let animationId = 0;
      let lastFrame = 0;
      let isVisible = false;
      let isPageVisible = !document.hidden;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const frameInterval = 1000 / (isMobile ? 24 : 30);
      let previousColors = colorStops.join(",");

      const render = (timeStamp: number) => {
        animationId = 0;
        if (!isVisible || !isPageVisible) return;

        if (timeStamp - lastFrame >= frameInterval) {
          lastFrame = timeStamp;
          const currentProps = propsRef.current;
          const currentColors = currentProps.colorStops ?? colorStops;
          const colorsKey = currentColors.join(",");

          if (colorsKey !== previousColors) {
            program!.uniforms.uColorStops.value = createColorStops(currentColors);
            previousColors = colorsKey;
          }

          program!.uniforms.uTime.value =
            (currentProps.time ?? timeStamp * 0.01) *
            (currentProps.speed ?? 1) *
            0.1;
          program!.uniforms.uAmplitude.value = currentProps.amplitude ?? 1;
          program!.uniforms.uBlend.value = currentProps.blend ?? blend;
          program!.uniforms.uLightMode.value =
            (currentProps.lightMode ?? lightMode) ? 1 : 0;
          renderer.render({ scene: mesh });
        }

        if (!reducedMotion) animationId = requestAnimationFrame(render);
      };

      const startRendering = () => {
        if (animationId === 0 && isVisible && isPageVisible) {
          animationId = requestAnimationFrame(render);
        }
      };

      const stopRendering = () => {
        if (animationId !== 0) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      };

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startRendering();
        else stopRendering();
      });
      const resizeObserver = new ResizeObserver(resize);
      const handleVisibilityChange = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) startRendering();
        else stopRendering();
      };

      resize();
      intersectionObserver.observe(ctn);
      resizeObserver.observe(ctn);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      disposeRenderer = () => {
        stopRendering();
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    });

    return () => {
      disposed = true;
      disposeRenderer?.();
    };
  }, [amplitude]);

  return (
    <div
      ref={ctnDom}
      className="aurora-container"
    />
  );
}