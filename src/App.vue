<script setup>
import { ref } from "vue";
import axios from "axios";
const value = ref("");
const list = ref([]);
get_list();
async function get_list() {
    const res = await axios({
        url: "https://eaanpn885s.hzh.sealos.run/get_list",
        method: "GET", // 修正拼写错误
    });
    list.value = res.data.list;
}
async function add() {
    if (!value.value) return;
    const res = await axios({
        url: "https://eaanpn885s.hzh.sealos.run/add_todo",
        method: "POST",
        data: {
            value: value.value,
            isCompleted: false,
        },
    });
    get_list();
    value.value = "";
}
async function update(id) {
    await axios({
        url: "https://eaanpn885s.hzh.sealos.run/update_todo",
        method: "POST",
        data: {
            id,
        },
    });
    get_list();
}
async function del(id) {
    await axios({
        url: "https://eaanpn885s.hzh.sealos.run/del_todo",
        method: "POST",
        data: {
            id: id,
        },
    });
    get_list();
}
</script>
<template>
    <div class="todo-app">
        <div class="title">Todo App</div>

        <div class="todo-form">
            <input
                v-model="value"
                type="text"
                class="todo-input"
                placeholder="Add a todo"
            />
            <div @click="add" class="todo-button">Add Todo</div>
        </div>

        <div
            v-for="item in list"
            :class="[item.isCompleted ? 'completed' : 'item']"
        >
            <div>
                <input
                    @click="update(item._id)"
                    v-model="item.isCompleted"
                    type="checkbox"
                />
                <span class="name">{{ item.value }}</span>
            </div>

            <div @click="del(item._id)" class="del">del</div>
        </div>
    </div>
</template>

<style scoped>
.todo-app {
    box-sizing: border-box;
    margin-top: 40px;
    margin-left: 1%;
    padding-top: 30px;
    width: 98%;
    height: 500px;
    background: #ffffff;
    border-radius: 5px;
}

.title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
}

.todo-form {
    display: flex;
    margin-top: 20px;
    margin-bottom: 15px;
    justify-content: center;
}

.todo-button {
    width: 100px;
    height: 52px;
    border-radius: 0 20px 20px 0;

    text-align: center;
    background: linear-gradient(
        to right,
        rgb(113, 65, 168),
        rgba(44, 114, 251, 1)
    );
    color: #fff;
    line-height: 52px;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
}

.todo-input {
    padding: 0px 15px 0px 15px;
    border-radius: 20px 0 0 20px;
    border: 1px solid #dfe1e5;
    outline: none;
    width: 300px;
    height: 50px;
}

.item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 50px;
    margin: 8px auto;
    padding: 16px;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
}

.del {
    color: red;
    cursor: pointer;
}

.completed {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 50px;
    margin: 8px auto;
    padding: 16px;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
    text-decoration: line-through;
    opacity: 0.4;
}
</style>
