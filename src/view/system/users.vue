<template>
	<div>
		<el-table
		:data="tableData"
		style="width: 100%">
			<el-table-column
			type="selection"
			width="50">
			</el-table-column>
			<el-table-column
			prop="s_name"
			label="所属组织架构">
			</el-table-column>
			<el-table-column
			label="用户名"
			prop="username"
			width="200">
			</el-table-column>
			<el-table-column
			label="备注"
			prop="remark"
			width="200">
			</el-table-column>
			<el-table-column
			label="状态"
			width="100">
	        <template scope="scope">
	          <div>
	            {{ scope.row.status }}
	          </div>
	        </template>
			</el-table-column>
			<el-table-column
			label="操作"
			width="200">
	        <template scope="scope">
	          <div>
	            <span>
	              <router-link :to="{ name: 'usersEdit', params: { id: scope.row.id }}" class="btn-link edit-btn">
	            	编辑
	              </router-link>
	            </span>
	            <span>
	              <el-button size="small" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
	            </span>
	          </div>
	        </template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {

	  data() {
	    return {
	    	tableData:[]
	    }
	  },

	  methods: {
	    getUsers(){
	    	this.apiPost('http://localhost:8090/admin/users').then((res) => {
	    		console.log(res.data);
	    		if(res.data.code==200){
	    			this.tableData = res.data.data.list
	    		}
	        })
	    }
	  },
	  created() {
      	this.getUsers()
      },
	}
</script>

<style>
	.btn-link {
		display: inline-block;
		line-height: 1;
		color: #fff;
		white-space: nowrap;
		cursor: pointer;
		text-align: center;
		box-sizing: border-box;
		margin-right: 10px;
		padding: 7px 9px;
		font-size: 12px;
		border-radius: 4px;
	}

	.edit-btn {
		background: #339df7
	}
</style>
