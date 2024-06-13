<script setup lang="ts">
import Card from "~/UI/card/Card.vue";
import CardHeader from "~/UI/card/CardHeader.vue";
import Input from "~/UI/Input.vue";
import InputGroup from "~/UI/input/InputGroup.vue";
import { reactive } from "vue";
import { router } from '@inertiajs/vue3'
import PrimaryButton from "~/UI/buttons/PrimaryButton.vue";

const form = reactive({
  email: "",
  password: "",
})

function submit() {
  console.log(form)
  router.post('/auth/register', form)
}

</script>

<template>
  <div class="w-full h-screen flex flex-row font-urbanist">
    <div class="w-full md:w-1/2 flex h-screen items-center justify-center">
      <Card class='w-full max-w-screen-sm'>
        <CardHeader>

          <h1 class="font-bold text-2xl font-urbanist">Register</h1>
          <p class="font-medium">Create an account to continue creating feature flags in Flipper</p>
        </CardHeader>

        <InputGroup>
          <p>Email</p>
          <Input

            v-model="form.email"
            type="text"
          />
        </InputGroup>

        <InputGroup>
          <p>Password</p>

          <Input
            v-model="form.password"
            type="password" />
        </InputGroup>

        <PrimaryButton
          :onclick="submit"
          :loading="false">Submit</PrimaryButton>
      </Card>
    </div>
    <div class="bg-black h-screen w-1/2 hidden md:flex">hi</div>
  </div>
</template>


