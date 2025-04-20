import React from "react";
import ImageWithBorder from "../../components/ImageWithBorder";
import Title from "../../components/Title";
import Text from "../../components/Text";
import FlexDiv from "../../components/FlexDiv";

export default function TopBanner({data}) {
    return (
        <div className="top-banner flex">
            <div className={"flex flex-row items-start gap-10 lg:px-20 py-5 px-5"}>
                <ImageWithBorder className={"lg:h-28 lg:w-28 w-16 h-16 object-contain"} logo={data.league?.image_src}></ImageWithBorder>
                <div>
                    <div className={"flex flex-row items-center gap-3"}>
                        <Title className={"font-bold text-3xl"} text={data.league?.name}></Title>
                    </div>
                    <FlexDiv className={"gap-3 flex lg:mt-5"}>
                        <Text className={"font-bold"} text={"Sport:"}></Text>
                        <Text text={data.league?.sport}></Text>
                    </FlexDiv>
                </div>
            </div>
        </div>
    );
}