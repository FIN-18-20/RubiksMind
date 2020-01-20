<template>
  <div class="ml-64 flex justify-center">
    <div class="talk-bubble tri-right rounded-lg btm-left-in">
      <div class="talktext">
        <div class="flex items-center">
          <img
            src="@/assets/img/question-circle-regular.svg"
            alt="question mark in circle"
            class="h-4 italic"
          />
          <div class="ml-2 text-blue-300 italic">Click to rescramble</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* CSS talk bubble */
.talk-bubble {
  margin: 20px;
  padding: auto;
  display: inline-block;
  position: relative;
  background-color: #1f3451;
}

.tri-right.btm-left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 38px;
  right: auto;
  top: auto;
  bottom: -20px;
  border: 12px solid;
  border-color: #1f3451 transparent transparent #1f3451;
}

/* talk bubble contents */
.talktext {
  padding: 0.5em;
  text-align: left;
  line-height: 1.5em;
}
</style>
