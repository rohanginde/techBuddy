import { Badge, Grid } from "@nextui-org/react";

function TechGrid({changeFilters}) {


    const languages = [
        "Next",
        "React",
        "Javascript",
        "HTML",
        "CSS",
        "Java",
        "Python",
        "Remove Filter",
      ];
    return ( <div>
        <Grid.Container gap={2}>
          {languages.map((item) => {
          if(item=="Remove Filter"){
            return (
              <Grid>
                <Badge
                  size="lg"
                  isSquared
                  color="error"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    changeFilters(item, event);
                  }}
                >
                  {item}
                </Badge>
              </Grid>
            )
          }else{
            return (
              <Grid>
                <Badge
                  size="lg"
                  isSquared
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    changeFilters(item, event);
                  }}
                >
                  {item}
                </Badge>
              </Grid>
            )
          }



            ;
          })}
        </Grid.Container>
      </div> );
}

export default TechGrid;