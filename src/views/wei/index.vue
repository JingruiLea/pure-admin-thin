<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  getUserCallList,
  UserCall,
  increaseUserCall,
  clearUserCall
} from "@/api/wei";
import { message } from "@/utils/message";
import { Search } from "@element-plus/icons-vue";

interface UserCallExtended extends UserCall {
  addedCalls: number;
}

const userCalls = ref<UserCallExtended[]>([]);
const search = ref("");
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const response = await getUserCallList();
  if (response.code === 0) {
    userCalls.value = response.data.map(userCall => ({
      ...userCall,
      addedCalls: 3
    }));
  } else {
    message(response.msg, { type: "error" });
  }
  loading.value = false;
};

onMounted(fetchData); // 使用新的 fetchData 函数

const filteredUserCalls = computed(() => {
  if (search.value) {
    return userCalls.value.filter(userCall =>
      userCall.username.includes(search.value)
    );
  } else {
    return userCalls.value;
  }
});

const increaseCallCount = async (userCall: UserCallExtended) => {
  userCall.call_count += userCall.addedCalls;
  const data = await increaseUserCall({
    username: userCall.username,
    call_count: userCall.addedCalls,
    room: userCall.room
  });
  if (data.code == 0) {
    userCall.addedCalls = 0;
    userCall.call_count = data.data.call_count;
  } else {
    message(data.msg, { type: "error" });
  }
  await fetchData();
};

const clearCallCount = async (userCall: UserCallExtended) => {
  userCall.call_count = 0;
  const data = await clearUserCall({
    username: userCall.username,
    room: userCall.room
  });
  if (data.code == 0) {
    userCall.call_count = data.data.call_count;
  } else {
    message(data.msg, { type: "error" });
  }
  await fetchData();
};
</script>

<template>
  <div class="container">
    <h1 class="title">用户调用次数列表</h1>
    <el-input v-model="search" placeholder="搜索用户名" :prefix-icon="Search" />
    <el-table
      :data="filteredUserCalls"
      v-loading="loading"
      style="margin-top: 20px"
    >
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="call_count" label="调用次数" />
      <el-table-column prop="room" label="房间号" />
      <!--增加按钮-->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-input-number
            v-model="row.addedCalls"
            :min="0"
            :max="100"
            :controls="false"
            size="small"
          />
          <el-button type="primary" @click="increaseCallCount(row)"
            >增加</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="清零">
        <template #default="{ row }">
          <el-button type="danger" @click="clearCallCount(row)">清零</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 300;
}
</style>
