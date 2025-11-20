<template>
  <div class="member-root">
    <div class="overlay">
      <div class="center-box">
        <img class="logo" src="/src/assets/logo.png" />

        <el-card>
          <el-form :model="form">
            <el-form-item label="帐号 : ">
              <el-input v-model="form.username" placeholder="帐号" />
            </el-form-item>

            <el-form-item label="密码 : ">
              <el-input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="密码">
                <template #suffix>
                  <el-icon @click="togglePassword" style="cursor:pointer">
                    <template v-if="showPassword">
                      <View />
                    </template>
                    <template v-else>
                      <ViewOff />
                    </template>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="验证码 : " class="captcha-row">
              <el-input v-model="form.captcha" placeholder="验证码" style="width: 60%" />
              <div class="captcha-box">AB12</div>
            </el-form-item>

            <el-form-item>
              <el-button class="btn-login" type="primary" @click="login">登录</el-button>
              <el-button class="btn-cancel" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)
const form = reactive({ username: '', password: '', captcha: '' })

function togglePassword() { showPassword.value = !showPassword.value }

function login() {
  if (!auth.logged) {
    try { (window as any).ElMessage?.error('请先完成前导登录') } catch(e) { alert('请先完成前导登录') }
    router.push({ name: 'Index' })
    return
  }
  if (form.username && form.password) {
    try { (window as any).ElMessage?.success('登录成功') } catch(e) { alert('登录成功') }
  } else {
    try { (window as any).ElMessage?.error('请填写完整') } catch(e) { alert('请填写完整') }
  }
}

function cancel() { router.push({ name: 'Index' }) }
</script>

<style lang="scss">
@use "sass:color";
$cancel-color: #333;

.member-root {
  --el-color-primary: #F6C54D;
  --el-color-primary-light-3: #f7cf6e;
  --el-color-primary-light-5: #f9da90;
  --el-color-primary-light-7: #fbe5b1;
  --el-color-primary-light-9: #fdf1d3;
  --el-color-primary-dark-2: #d9aa33;
  
  height: 100%;

  position: relative;
  &:before {
    content: '';
    width: 100%;
    height: 100%;    
    position: absolute;
    top: 0;
    left: 0;
    background: center / cover no-repeat url('/src/assets/city-bg.png');
    filter: blur(20px);
    z-index: -1;
  }

  .overlay {
    height: 100%;
    background: center / contain no-repeat url('/src/assets/city-bg-m.png');

    display: flex;
    justify-content: center;
    align-items: center;

    .center-box { 
      width: 400px;
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo {
        width: 150px;
        margin-bottom: 20px;
      }

      .el-card {
        border-radius: 10px;
        border: none !important;
        border-top: 10px solid var(--el-color-primary) !important;
        background: rgba(68, 68, 68, 0.9);

        .el-card__body {
          padding: 40px 20px 18px 15px !important;
        }
      }

      .el-form-item__label {
        width: 70px;
        color: var(--el-color-primary) !important;
      }

      .el-form-item__content {
        justify-content: center !important;
      }

      .el-input__wrapper {
        background: #444;
      }

      .captcha-row { 
        display: flex;  
        align-items: center;

        .el-input {
          width: calc(100% - 45px) !important;
        }

        .captcha-box { 
          width: 40px;
          height: 100%;
          margin-left: 5px;
          background: rgba(200, 200, 200, 1); 
          color:#111; 
          
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .btn-login {
        color: #333;
      }
      .btn-cancel {
        background: #333;
        color: #fff;
        border: 3px solid #333;

        &:hover {
          background: color.scale($cancel-color, $lightness: 2%);
          border: 3px solid color.scale($cancel-color, $lightness: 2%);
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .member-root {
    .overlay {
      background: center / cover no-repeat url('/src/assets/city-bg-m.png');

      .center-box {
        width: 100%;
      }
    }
  }
}
</style>
