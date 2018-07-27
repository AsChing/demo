<!-- <template>
  <div>
  	
  	<el-col :span="8">
  	<h2>权限</h2>
	    <el-menu default-active="2" class="el-menu-vertical-demo" v-for="tag in tags" :key="tag">
	      <el-menu-item index="1"><i class="el-icon-setting"></i>{{tag}}</el-menu-item>
	    </el-menu>
	</el-col>

    <el-tag v-for="tag in tags"  type="gray" key="tag"> {{tag}} </el-tag>
  </div>
</template> -->

<script>
 //  export default {
 //    data() {
 //      return {
 //        tags: {child:{child:{}}},
 //      };
 //    },

 //    methods: {
 //   //    handleClick(tab, event) {
	//   // },
	// },	

	// // 接收上个页面的参数
 //    created(){
	// 	this.tags = this.$route.query.menusList;
	// }
 //  }
</script>

<template>
	<div>  
		<h2>权限</h2>
		<div v-for="secMenu in menuData">
			<div class="c-light-gray p-l-10 m-t-15">{{secMenu.title}}</div>
			<div class="h-50" v-for="item in secMenu.child">
				<!-- <template v-if="item.menu == menu">
					<div class="w-100p h-50 p-l-40 left-menu pointer c-blue" @click="routerChange(item)">{{item.title}}</div>
				</template>
				<template v-else> -->
					<div class="w-100p h-50 p-l-40 left-menu pointer c-gra" @click="routerChange(item)">{{item.title}}</div>
				<!-- </template> -->
			</div>
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'
// Vue.component('leftMenu', {
//  		props: ['menuData', 'menu'],
// 	});
export default {

  props: ['menuData'],
  data() {
    return {
    	// menuData: [],
    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {
        _g.shallowRefresh(this.$route.name)
      }
    }
  },

  // 接收上个页面的参数
 //    created(){
	// 	this.tags = this.$route.query.menusList;
	// }
}
</script>
