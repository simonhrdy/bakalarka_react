import ImageWithBorder from "../../components/ImageWithBorder";
import Title from "../../components/Title";
import Text from "../../components/Text";
import FlexDiv from "../../components/FlexDiv";
import Image from "../../components/Image";

export default function TopBanner({ data, stats }) {
    const statsArray = Array.isArray(stats) ? stats : [];

    return (
        <div className="top-banner flex">
            <div className={"flex flex-row items-start gap-10 lg:px-20 py-5 px-5"}>
                <ImageWithBorder className={"lg:h-28 lg:w-28 w-16 h-16 object-contain rounded-3xl" +
                    ""} logo={data.image_src}></ImageWithBorder>
                <div>
                    <div className={"flex flex-row items-center gap-3"}>
                        <Title className={"font-bold text-3xl"} text={data.first_name + " " + data.last_name + " #" + data.number}></Title>
                    </div>
                    <FlexDiv className={"gap-3 flex mt-2 lg:mt-5"}>
                        <Text className={"font-bold"} text={"Pozice:"}></Text>
                        <Text text={data.position}></Text>
                    </FlexDiv>
                    <FlexDiv className={"flex lg:mt-5 mt-2 items-center"}>
                        <Text className={"font-bold"} text={"Tým:"}></Text>
                        <Image className={"lg:h-8 lg:w-8 w-5 h-5 object-contain ml-3 mr-1"} src={data.team_id.image_src}></Image>
                        <Text text={data.team_id.name}></Text>
                    </FlexDiv>
                    {statsArray.map((stat, index) => {
                        const [name, value] = stat.split(":");

                        return (
                            <FlexDiv className={"gap-3 flex mt-2"} key={index}>
                                <Text className={"font-bold"} text={`${name.charAt(0).toUpperCase() + name.slice(1)}:`}></Text>
                                <Text text={value}></Text>
                            </FlexDiv>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
