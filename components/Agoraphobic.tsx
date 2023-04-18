import Link from 'next/link';
import React, { useState, useRef, Suspense, ReactElement } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ManModel from 'components/Man';
import { Group } from 'three';

import type { PropsWithChildren } from 'react';

const Figure = ({ mode }: { mode: string | undefined }) => {
  const ref = useRef<Group>(null); // This reference will give us direct access to the mesh

  const [circleAngle, setCircleAngle] = useState<number>(0);
  const randomBetween2Num = (max: number, min: number) =>
    Math.random() * (max - min) + min;

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    const circleVal = (Math.sin(circleAngle) + 1) / 2;
    const amp = 0.06 * circleVal;

    if (ref.current) {
      switch (mode) {
        case 'trembling':
          setCircleAngle(circleAngle + (Math.PI / 180) * 2);

          ref.current.rotation.y = -Math.PI / 8;
          ref.current.position.x = randomBetween2Num(amp, -amp);
          ref.current.position.y = randomBetween2Num(amp, -amp);
          ref.current.position.z = randomBetween2Num(amp, -amp);
          break;

        case 'rotating':
          ref.current.rotation.x = 0;
          ref.current.rotation.y += -Math.PI / 32;
          break;
        default:
          ref.current.rotation.x = ref.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <group ref={ref} dispose={null}>
      <ManModel />
    </group>
  );
};

const TextBox = (props: PropsWithChildren): JSX.Element => (
  <div className="text_box">
    {props.children}
    <style jsx>
      {`
        .text_box {
          position: absolute;
          min-width: 8rem;
          top: 50%;
          left: 50%;
          z-index: 1;
          background: white;
          padding: 0 1rem;
          transform: translate(-50%, -50%);
          text-align: center;
        }
      `}
    </style>
  </div>
);

type Props = {
  mode?: string | undefined;
  dimension?: string | undefined;
};

const Agoraphobic = (props: PropsWithChildren<Props>) => {
  const { mode, dimension, children } = props;

  let style = null;

  switch (dimension) {
    case 'inside':
      style = `.anim_canvas {
        width: 100%;
        height: 600px;
        background-color: #fff;
      }`;
      break;
    default:
      style = `.anim_canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left:0;
        background-color: #fff;
      }`;
  }

  let template: ReactElement = <></>;
  switch (mode) {
    case 'trembling':
      template = (
        <>
          <span>404 Not Found</span>
          <br />
          <Link href={{ pathname: process.env.HomeDir }}>Return</Link>
          <style jsx>{'a {font-size: 17px;}'}</style>
        </>
      );
      break;
  }

  return (
    <section className="anim_canvas">
      <TextBox>{mode ? template : children}</TextBox>

      <Canvas>
        <ambientLight color={0xffffff} intensity={100} />
        <Suspense fallback={null}>
          <Figure mode={mode} />
        </Suspense>
      </Canvas>

      <style jsx={true}>{style}</style>
    </section>
  );
};

export default Agoraphobic;
