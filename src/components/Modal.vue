<template>
    <!-- The Modal -->
    <div class="modal" :style="show == true ? 'display: block' : 'display: none'">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"/>
                <div class="close" @click="closeModal">&times;</div>
            </div>
            <div class="modal-body">
                <slot name="body"/>
                <hr>
            </div>
            <div class="modal-footer">
                <slot name="footer"/>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Modal',
    props: {
        show: {
            required: true
        }
    },
    methods: {
        closeModal(){
            this.$emit('closeModal')
        }
    },
    mounted() {
        const modal = document.getElementById("myModal")
        window.onclick = (event) => {
            if (event.target == modal) {
                this.$emit('closeModal')
            }
        }
    }
}
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s
}

/* Modal Content */
.modal-content {
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s
}

/* The Close Button */
.close {
  background-color: rgb(253,184,21);;
  color: white;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: rgb(253,184,21);
}

.modal-header h3 {
  display: flex;
  align-items: center;
  background-color: rgb(253,184,21);
}

.modal-body {
  padding: 2px 16px;
  text-align: center;
}

.modal-body img {
  margin: 5px auto;
  display: block;
  float: none;
}

.modal-footer {
  width: 100%;
  padding: 5px 0 20px;
}

hr {
  margin: 10px;
}
/* Add Animation */
@-webkit-keyframes slideIn {
  from {bottom: -300px; opacity: 0} 
  to {bottom: 0; opacity: 1}
}

@keyframes slideIn {
  from {bottom: -300px; opacity: 0}
  to {bottom: 0; opacity: 1}
}

@-webkit-keyframes fadeIn {
  from {opacity: 0} 
  to {opacity: 1}
}

@keyframes fadeIn {
  from {opacity: 0} 
  to {opacity: 1}
}
</style>