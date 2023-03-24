<template>
  <body class="wrap">
    <div>
      <h1 class="title">🌆PANELKA GAME</h1>
      <h3 class="subtitle">Запомни все синие клетки и открой их</h3>
    </div>
    <MyBoard />
  </body>
</template>

<script>
import MyBoard from "./components/MyBoard";

export default {
  name: "App",
  components: {
    MyBoard,
  },
};
</script>

<style>
* {
  font-family: "Press Start 2P", cursive;
}

body {
  min-height: 100vh !important;
  background-color: black;
}

.wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: max-content;
  background-color: black;
  max-height: 100vh;
  width: 100%;
  align-items: flex-start;
  justify-items: center;
}

.title {
  font-size: 3rem;
  line-height: 1;
  --tw-text-opacity: 1;
  color: rgba(96, 165, 250, var(--tw-text-opacity));
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  text-align: center;
}

.subtitle {
  font-size: 1.25rem;
  line-height: 1.75rem;
  --tw-text-opacity: 1;
  color: rgba(96, 165, 250, var(--tw-text-opacity));
  justify-items: center;
  text-align: center;
}

@media screen and (max-width: 750px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
