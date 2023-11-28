import Section01 from "components/web/main/mainComponents/mainContentsComponents/Section01";
import Section02 from "components/web/main/mainComponents/mainContentsComponents/Section02";
import Section03 from "components/web/main/mainComponents/mainContentsComponents/Section03";

const MainContents = (props) => {
    const registrationInfo = props.registrationInfo;

    return (
        <>
            <div id="container">
                {/*section01*/}
                <Section01 registrationInfo ={registrationInfo} />

                {/*section02*/}
                <Section02 />

                {/*section03*/}
                <Section03 />
            </div>
        </>
    );
};

export default MainContents;
