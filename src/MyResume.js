

import React, { useRef, useEffect, useState, Suspense } from "react";
import "./Homepage.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";
// Page State
import state from "./components/state";

// R3F
import { Canvas } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";
//video scrollArea

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
  x,
  y,
  z
}) => {
  const ref = useRef();
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[x, y, z]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className='container'>
            <h1 className='title'>{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const HTMLContent1 = ({
    domContent,
    children,
    bgColor,
    position
  }) => {
    const ref = useRef();
    const [refItem, inView] = useInView({
      threshold: 0,
    });
    useEffect(() => {
      inView && (document.body.style.background = bgColor);
    }, [inView]);  
    return (
      <Section factor={1.5} offset={1}>
        <group position={[0, position, 0]}>
          <Html fullscreen portal={domContent}>
            <div ref={refItem} className='container1'>
            {children}
            </div>
          </Html>
        </group>
      </Section>
    );
  };
  
function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className='loading' style={{ opacity }}>
          <div className='loading-bar-container'>
            <a.div className='loading-bar' style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}
const setStyles = (wrapperEl, videoEl, playbackRate) => {
    wrapperEl.style.marginTop = `calc(180% - ${Math.floor(videoEl.duration) *
      playbackRate +
      'px'})`
    wrapperEl.style.marginBottom = `calc(180% - ${Math.floor(videoEl.duration) *
      playbackRate +
      'px'})`
  }

export default function MyResume() {
  
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 130], fov: 60 }}>
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
        <HTMLContent
            domContent={domContent}
            bgColor='#00b5ef'
            modelPath='/painting.glb'
            position={100}
            x= {50}
            y = {-35}
            z= {0}>
            <span>The Gallery</span>
            <span>My Life</span>
          </HTMLContent>
          <HTMLContent
          domContent={domContent}
            bgColor='#00b5ef'
            modelPath='/painting2.glb'
            position={80}
            x= {-40}
            y = {-35}
            z= {0}>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}