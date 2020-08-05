<template>
  <GmapMap
    :center="{lat: location.lat, lng:location.lng }"
    :zoom="6"
    :maxZoom="15"
    :minZoom="3"
    :streetViewControl="false"
    class="google-map"
  >
    <GmapMarker
      v-for="(marker,index) in markers"
      :key="index"
      :position="marker.geoLocation"
      @click="handleMarkerClick(marker)"
    ></GmapMarker>
  </GmapMap>
</template>

<script>
import { mapState } from "vuex";
import database from "../firebase/init";
import slugify from "slugify";

export default {
  data() {
    return {
      location: {
        lat: 10,
        lng: 20
      },
      markers: []
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  },

  methods: {
    handleMarkerClick(marker) {
      if (this.user.user_id === marker.user_id) {
        this.$router.push({
          name: "profile"
        });
      } else {
        this.$router.push({
          name: "otherProfile",
          params: {
            userId: marker.user_id
          }
        });
      }
    }
  },

  created() {
    // find user doc id by alias
    const slug = slugify(this.user.alias, {
      replacement: "-",
      remove: /[$*_+~.()'"!\-:@]/g,
      lower: true
    });

    // options
    const options = {
      maximumAge: 60000,
      timeout: 3000
    };

    // get current location
    this.$getLocation(options)
      .then(coordinates => {
        this.location = { ...coordinates };

        // find user record and update location
        const ref = database.collection("users").doc(slug);

        ref.update({
          geoLocation: {
            lat: coordinates.lat,
            lng: coordinates.lng
          }
        });
      })
      .catch(e => console.log(e));

    // get all user with location
    database
      .collection("users")
      .get()
      .then(snapShot => {
        snapShot.forEach(doc => {
          if (doc.data().geoLocation) {
            this.markers.push({
              id: doc.id,
              ...doc.data()
            });
          }

          console.log(this.markers);
        });
      })
      .catch(e => console.log(e));
  }
};
</script>

<style>
.google-map {
  position: absolute !important;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>