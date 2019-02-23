<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>JAWS Days 2018</span>
        <span class="font-weight-light"> Demo EC Site</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/marcy-terrui/jawsdays-2019-demo"
        target="_blank"
      >
        <span class="mr-2">Source Code</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <ECSite/>
    </v-content>
  </v-app>
</template>

<script>
import ECSite from './components/ECSite'

export default {
  name: 'App',
  components: {
    ECSite
  },
  data () {
    return {
      //
    }
  }
}
</script>
