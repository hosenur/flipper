<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import { Head } from '@inertiajs/vue3'
import PrimaryButton from "~/UI/buttons/PrimaryButton.vue";
import {PlusCircleIcon} from 'lucide-vue-next'
import { ref } from "vue";
import Dialog from "~/UI/dialog/Dialog.vue";
import DialogFooter from "~/UI/dialog/DialogFooter.vue";
import SecondaryButton from "~/UI/buttons/SecondaryButton.vue";
import DialogContent from "~/UI/dialog/DialogContent.vue";
import Input from "~/UI/Input.vue";
import InputGroup from "~/UI/input/InputGroup.vue";
const createProjectModalOpen = ref(false)
const setCreateProjectModalOpen = (value: boolean) => {
  createProjectModalOpen.value = value
}
const form = ref({
  title: "",
  description: "",
})
</script>
<template>
  <Head title="Dashboard" />
  <DashboardLayout>
    <Dialog :open="createProjectModalOpen" @update:open = "setCreateProjectModalOpen">
      <DialogContent>
        <InputGroup>
          <p>Project Title</p>
          <Input
            placeholder="Google"

            v-model="form.title"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <p>Project Description</p>
          <Input
            placeholder="Search Engine"
            v-model="form.description"
            type="text"
          />
        </InputGroup>

      </DialogContent>
      <DialogFooter class="w-fit ml-auto">
      <SecondaryButton
        class="{ 'opacity-25': form.processing }"
        @click="setCreateProjectModalOpen(false)"
        >
        Cancel
      </SecondaryButton>
      <PrimaryButton

      >
        Add Project
      </PrimaryButton>
    </DialogFooter>


    </Dialog>
    <div class="flex justify-between">


    <h1>Projects</h1>
      <PrimaryButton
        @click="setCreateProjectModalOpen(true)"
      >
        <PlusCircleIcon class="w-4 h-4 mr-2" />
        Create Project
      </PrimaryButton>
    </div>
  </DashboardLayout>
</template>

<style scoped>

</style>
