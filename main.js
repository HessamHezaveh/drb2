//now we should attach it in to our windo object 
//const THREE = window.MINDAR.IMAGE.THREE;
//modular 
import * as THREE from 'three';
import { MindARThree} from 'mindar-image-three';
import {loadVideo } from './src/loader.js';
import {createChromaMaterial} from "./src/chroma-video.js" ;


document.addEventListener('DOMContentLoaded', () =>{
const start = async() => {
        //instantiate the image 
        const mindarThree = new MindARThree({
            container: document.body,  
            imageTargetSrc: './assets/targets.mind',
        });

        const {renderer, scene, camera} = mindarThree;

//Add video here
        const video = await loadVideo("./assets/DR.mp4");
        const texture = new THREE.VideoTexture(video);

//Plane
        const geometry  = new THREE.PlaneGeometry(1,848/464);

        //const material = new THREE.MeshBasicMaterial({map: texture});
        const material= createChromaMaterial(texture, 0x00ff00);

        const plane = new THREE.Mesh(geometry, material);

        //rotation
        // plane.rotation.x = Math.PI/2;
        // plane.position.y = 0.7;
        // plane.scale.multiplyScalar(4);


    
        const anchor = mindarThree.addAnchor(0);    
        anchor.group.add(plane);



        anchor.onTargetFound = () => {
                video.play();
        }
        anchor.onTargetLost = () =>{
                video.pause();
        }
        //stop video at 6th second
        // video.addEventListener("play", ()=>{
        //         video.currentTime=6;
        // })


//////////START the engine
        //await must use in a syc 
        await mindarThree.start();


        renderer.setAnimationLoop(()=>{
             renderer.render(scene, camera);

        });
    }
    start();
//     const button = document.createElement("button");
//     button.textContent = "Start";
//     button.addEventListener("click", start);
//     document.body.appendChild(button);



});