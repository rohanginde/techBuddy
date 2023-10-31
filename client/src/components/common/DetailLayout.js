import { Grid, Card, Text } from "@nextui-org/react";
export default function DetailLayout({ data, colors }) {
  const MockItem = ({ text, height, color, label }) => {
    console.log(height);
    return (
      <Card css={{ h: height, $$cardColor: color, overflow: "hidden" }}>
        <Card.Body>
          {/* <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text> */}
          <Text>{label}</Text>
          <Text size={20} css={{ h: height }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Grid.Container gap={2} justify="center">
      <Grid lg={7} xs={7}>
        <MockItem text={data.title} label="Title" color={colors[0]} />
      </Grid>
      <Grid lg={3} xs={3}>
        <MockItem text={data.author} label="Posted By" color={colors[1]} />
      </Grid>
      <Grid lg={10} xs={10}>
        <MockItem
          text={data.body}
          label="Main Content"
          color={colors[2]}
          height="500px"
        />
      </Grid>
    </Grid.Container>
  );
}
