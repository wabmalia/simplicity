registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          Asleep
        </Text>
      }
    >
      <Slider
        label="Brightness"
        settingsKey="asleepBrightness"
        min="20"
        max="100"
      />
    </Section>
    <Section
      title={
        <Text bold align="center">
          Flashlight
        </Text>
      }
    >
      <ColorSelect
        label="Color"
        settingsKey="flashlightColor"
        colors={[{ color: "tomato" }, { color: "white" }]}
      />
    </Section>
  </Page>
));
