<script setup>
const nuxtApp = useNuxtApp();
const menus = nuxtApp.$config.menus;
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <v-footer class="pa-0">
    <v-card elevation="0" rounded="0" width="100%" color="#86c4c8">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="(item2, key) in menus" :key="key" cols="6" :md="3">
              <h3>
                <nuxt-link :to="localePath(item2.to)" style="color: inherit">
                {{ $t(item2.label) }}
              </nuxt-link>
              </h3>

              <div
                v-for="(item, key2) in item2.children"
                :key="key2"
                class="mt-2"
              >
                <template v-if="item.to">
                  <nuxt-link
                    style="color: inherit"
                    depressed
                    :to="localePath(item.to)"
                    exact
                    >{{ $t(item.label) }}
                    <template v-if="item.target">
                      <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                    </template></nuxt-link
                  >
                </template>
                <template v-else>
                  <a
                    style="color: inherit"
                    depressed
                    :href="item.href"
                    :target="item.target || null"
                    exact
                    >{{ $t(item.label) }}
                    <template v-if="item.target">
                      <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                    </template></a
                  >
                </template>
              </div>
            </v-col>

            <v-col cols="6" :md="3">
              <h3>{{ $t("language") }}</h3>
              <div class="mt-4">
                <nuxt-link
                :to="switchLocalePath('en')"
                  style="color: inherit;"
                >
                  English
                </nuxt-link>
              </div>
              <div class="mt-4">
                <nuxt-link
                :to="switchLocalePath('ja')"
                  style="color: inherit;"
                >
                  日本語
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="my-5 text-center" v-html="$config.SITE_FOOTER">
      </v-card-text>
    </v-card>
  </v-footer>
</template>
