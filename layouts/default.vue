<template>
  <LayoutsApp>
    <LayoutsHeader> </LayoutsHeader>

    <v-main>
      <slot />
    </v-main>

    <LayoutsFooter></LayoutsFooter>

    <MoleculesMenuToTopBtn></MoleculesMenuToTopBtn>
  </LayoutsApp>
</template>
