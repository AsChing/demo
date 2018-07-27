<template>
	<div>  
		<div>
	    	<h1>---------hello {{userInfo.username}}!----------</h1>
	  	</div>
		<h2>权限</h2>
		<div v-for="secMenu in menusList">
			<div class="c-light-gray p-l-10 m-t-15">{{secMenu.title}}</div>
			<div class="h-50" v-for="item in secMenu.child">
				<div class="w-100p h-50 p-l-40 left-menu pointer c-gra"><font color="blue">{{item.title}}</font></div>
				<div class="h-50" v-for="val in item.child">
					<template>
						<div class="w-100p h-50 p-l-40 left-menu pointer c-gra">{{val.title}}</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	  data() {
	    return {
	    	userInfo:JSON.parse(window.localStorage.getItem('userInfo')),
	    	menusList:JSON.parse(window.localStorage.getItem('menus'))
	    }
	  },

	  methods: {
	    
	  },
	}
</script>
