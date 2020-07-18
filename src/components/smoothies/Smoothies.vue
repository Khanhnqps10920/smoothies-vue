<template>
  <div class="smoothies container">
    <div class="row">
      <div class="col s4">
        <div class="card">
          <div class="card-content">
            <h2 class="indigo-text">title</h2>
            <ul class="ingredients">
              <li>
                <span class="chip">chipp</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col s4">
        <div class="card">
          <div class="card-content">
            <h2 class="indigo-text">title</h2>
            <ul class="ingredients">
              <li>
                <span class="chip">chipp</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../firebase/init";

export default {
  created() {
    const smoothiesRef = database.collection("smoothies");
    smoothiesRef.get().then(snapShot => {
      const dataArr = snapShot.docs.map(doc => {
        return doc.data();
      });

      console.log(dataArr);
    });
  }
};
</script>

<style>
.smoothies {
  margin-top: 60px;
}

.smoothies h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}

.smoothies .ingredients {
  margin: 30px auto;
}

.smoothies .ingredients li {
  display: inline-block;
}
</style>