import React from 'react';
import { Particles } from 'react-tsparticles';
import '../particles.css';
export default function ParticleBackground() {
    return (
      <Particles
            id="tsparticles"
            init={() => {}}
            loaded={() => {}}
            height="100vh"
            width="100vw"
            className="particles"
            canvasClassName="particles"
            options={{
              background: {
                color: {
                  value: "#00000",
                },
              },
              fpsLimit: 40,
              interactivity: {
                detectsOn: "canvas",
                events: {
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: {
                    quantity: 2,
                    duration: 2
                  },
                  repulse: {
                    distance: 200,
                    duration: 2
                  },
                },
              },
              particles: {
                color: {
                  value: "#FF0000",
                },
                links: {
                  color: "#FF0000",
                  distance: 500,
                  enable: true,
                  opacity: 0.15,
                  width: 3,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: true,
                  speed: 1.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 300,
                  },
                  value: 10,
                },
                opacity: {
                  value: 0.1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: false,
                  value: 3,
                },
              },
              detectRetina: true,
            }}
      />
    )
  }