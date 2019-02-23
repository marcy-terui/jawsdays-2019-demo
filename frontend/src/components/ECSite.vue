<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/echo-spot.jpg')"
          class="my-3"
          contain
          height="300"
        ></v-img>
      </v-flex>

      <v-flex xs12>
        <h1 class="font-weight-bold mb-3">
          Echo Spot with Alexa, Balck
        </h1>
        <v-btn
          class="mb-3"
          color="primary"
          @click="order"
          :disabled="bottonEnable"
        >
          Click to Order
        </v-btn>
      </v-flex>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false; progress = defaultProgress">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Progress</v-toolbar-title>
          </v-toolbar>
          <v-stepper vertical non-linear v-if="progress.length > 0">
            <v-stepper-step
              v-for="(item,i) in progress"
              :key="i"
              :step="i + 1"
              :rules="[() => !item.failed]"
              :complete="item.succeeded"
              class="font-weight-bold mb-4"
            >
              {{item.msg}}
              <v-progress-linear
                indeterminate
                color="primary"
                v-if="i == progressCount"
              ></v-progress-linear>
            </v-stepper-step>
          </v-stepper>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  import config from '../demoConfig'

  const defaultProgress = [
    { succeeded: false, failed: false, msg: 'Start' },
    { succeeded: false, failed: false, msg: 'Payment' },
    { succeeded: false, failed: false, msg: 'Stock reservation' },
    { succeeded: false, failed: false, msg: 'Sending e-mail' },
    { succeeded: false, failed: false, msg: 'Finish' }
  ]

  export default {
    data: () => (
    {
      bottonEnable: false,
      dialog: false,
      progress: defaultProgress,
      defaultProgress: defaultProgress,
      progressCount: 0
    }),
    methods: {
      order () {
        this.dialog = true
        const ws = new WebSocket(config.WS_ENDPOINT)
        ws.onopen = () => {
          ws.send(JSON.stringify({ action: 'order' }))
        }
        this.progressCount = 0
        ws.onmessage = (msg) => {
          let item = JSON.parse(msg.data)
          switch (item['state']) {
            case 'started':
              this.progress.splice(this.progressCount, 1, { succeeded: true, failed: false, msg: 'Started.' })
              break
            case 'success':
              this.progress.splice(this.progressCount, 1, { succeeded: true, failed: false, msg: item['msg'] })
              break
            case 'error':
              this.progress.splice(this.progressCount, 1, { succeeded: false, failed: true, msg: item['msg'] })
              this.progressCount = -2
              break
            case 'finished':
              this.progress.splice(this.progressCount, 1, { succeeded: true, failed: false, msg: 'Finished.' })
              this.progressCount = -2
              break
          }
          this.progressCount++
        } 
      }
    }
  }
</script>

<style>

</style>
