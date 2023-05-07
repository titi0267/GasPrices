import MapboxGl, {Camera} from '@rnmapbox/maps';

const Map = (props: {camera: any}) => {
  return (
    <MapboxGl.MapView
      style={{height: '100%', width: '100%'}}
      rotateEnabled={false}>
      <Camera
        ref={props.camera.current}
        centerCoordinate={[2.2137, 46.2276]}
        animationDuration={0}
        zoomLevel={3.5}></Camera>
    </MapboxGl.MapView>
  );
};

export default Map;
