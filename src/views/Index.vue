<template>
  <div class="Index-root">
    <div class="overlay">
      <header class="header">
        <img src="/src/assets/logo.png" alt="logo" class="logo" />
        <h1>海岸电子商务管理系统</h1>
      </header>

      <div class="divider"></div>

      <div class="content">
        <div class="left-img">
          <img src="@/assets/landing1-left.png"/>
        </div>

        <div class="right-form">
          <div class="form">
            <div class="form-title"> 登录 </div>
            <el-form :model="form">
              <div class="text"> 请输入您的邮箱账号和密码 </div>

              <el-form-item label="帐号 : ">
                <el-input v-model="form.username" placeholder="帐号" @keyup.enter="login" />
              </el-form-item>
              <el-form-item label="密码 : ">
                <el-input
                  v-model="form.password"
                  :type="isShowPassword ? 'text' : 'password'"
                  placeholder="密码"
                  clearable
                  @keyup.enter="login"
                >
                  <!-- 密碼顯示/隱藏 ICON -->
                  <template #suffix>
                    <el-icon @click="isShowPassword = !isShowPassword" class="cursor-pointer">
                      <Component :is="passwordIcon" />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

import authApi from '@/api/auth'

import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
const form = reactive({ username: '', password: '' })

let isShowPassword = ref(false)

let passwordIcon = computed(() => {
  return isShowPassword.value ? 'View' : 'Hide'
})

async function login() {
  if(!form.username || !form.password) {
    ElMessage.error('请先输入账号及密码')
    return
  }

  try {
    let res = await authApi.login({
      username: form.username,
      password: form.password
    })

    if(res?.code === 200 && res?.data?.username) {
      router.push({ name: 'Onboarding' })
    } else {
      form.username = ''
      form.password = ''
    }
  }
  catch (error: any) {
    console.log(error.response)
    form.username = ''
    form.password = ''
  }
}
</script>

<style lang="scss" scoped>
.Index-root {
  padding: 40px 0;

  .overlay {

    .header {
      width:90%;
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      
      .logo {
        margin-right: 20px;
      }

      h1 {
        font-size: 20px;
      }
    }

    .divider { 
      height: 5px; 
      background: #7B7B7B; 
      margin: 15px 0;
    }

    .content {
      width:90%;
      max-width: 900px;
      margin: 0 auto;

      display: flex; 
      justify-content: center;
      align-items: flex-end;

      .left-img {
        width: 50%;
        margin-right: 10px;

        img { 
          width: 100%; 
        }
      }

      .right-form { 
        width: 50%;
        color: #7B7B7B;

        .form {
          .form-title {
            font-size: 20px;
            font-weight: 900;
            padding: 30px 0;
            text-align: center;
          }

          .el-form {
            padding: 20px; 
            border-left: 1px solid #7B7B7B;

            .text {
              margin-bottom: 25px;
            }

            .el-form-item {
              margin-bottom: 20px;
            }

            .el-button {
              margin-top: 30px;
              margin-bottom: -20px;
            }
          }
        }
      }
    }

  }
}

@media (max-width: 550px) {
  .Index-root {
    padding: 20px 0;
    height: 100%;

    .overlay {
        height: 100%;

        display: flex;
        flex-direction: column;
        
      .header {
        width: 90%;
        margin: 0 auto;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        .logo {
          width: 90px;
          margin-right: 15px;
        }

        h1 {
          font-size: 20px;
        }
      }

      .divider {
        height: 3px; 
        background: #7B7B7B; 
      }

      .content {
        width: 90%;
        height: 100%;
        margin: 0 auto;

        display: flex; 
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-end;

        position: relative;

        .left-img {
          width: auto !important;
          max-width: 100%;
          height: 45%;
          aspect-ratio: 471 / 331;

          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;

          img { 
            width: 100%;
          }
        }

        .right-form { 
          width: 85%;
          position: absolute;
          top: 0px;
          color: #7B7B7B;

          .form {
            .form-title {
              font-size: 20px;
              padding: 15px 0;
              text-align: center;
            }

            .el-form {
              padding: 15px; 
              border-radius: 5px;
              background: rgba(100, 100, 100, 0.1);

              .text {
                margin-bottom: 15px;
              }

              .el-form-item {
                margin-bottom: 15px;
              }

              .cursor-pointer {
                cursor: pointer;
              }
              .el-button {
                margin-top: 15px;
                margin-bottom: -15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
