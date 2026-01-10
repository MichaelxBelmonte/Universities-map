import "leaflet";

declare module "leaflet" {
  interface MarkerClusterGroupOptions {
    chunkedLoading?: boolean;
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    singleMarkerMode?: boolean;
    disableClusteringAtZoom?: number;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    animateAddingMarkers?: boolean;
    spiderfyDistanceMultiplier?: number;
    spiderLegPolylineOptions?: PolylineOptions;
    polygonOptions?: PolylineOptions;
    iconCreateFunction?: (cluster: MarkerCluster) => DivIcon | Icon;
  }

  interface MarkerCluster extends Marker {
    getChildCount(): number;
    getAllChildMarkers(): Marker[];
    spiderfy(): void;
    unspiderfy(): void;
  }

  class MarkerClusterGroup extends FeatureGroup {
    constructor(options?: MarkerClusterGroupOptions);
    addLayer(layer: Layer): this;
    removeLayer(layer: Layer): this;
    clearLayers(): this;
    getVisibleParent(marker: Marker): Marker | MarkerCluster;
    refreshClusters(clusters?: MarkerCluster | MarkerCluster[]): this;
    hasLayer(layer: Layer): boolean;
    zoomToShowLayer(layer: Marker, callback?: () => void): void;
  }

  function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup;
}
