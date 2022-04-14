import { useUqApp } from "App/App";
import { useLocation } from "react-router-dom";
import { Band, BandString, ButtonAsync, Form, Submit, useNav } from "tonwa-com";
import { BandIDNOInput } from "tonwa-com-uq";
import { Person } from "uq-app/uqs/BzWorkshop";

export function ClientSurveyPage() {
    let nav = useNav();
    let { uqs } = useUqApp();
    const { search: urlParam } = useLocation();
    let id = Number.parseInt(urlParam);
    async function onNext() {
        let { BzWorkshop } = uqs;
        if (isNaN(id) === true) {
            nav.open(<InvalidPage />);
            return
        }
        let ret = await BzWorkshop.ID<Person>({
            IDX: BzWorkshop.Person,
            id,
        });
        if (ret.length === 0) {
            nav.open(<InvalidPage />);
            return;
        }
        nav.open(<ClientForm person={ret[0]} />);
    }
    return <div className="p-3">
        <div className="my-5 text-center text-success">
            Welcome to the servey!
        </div>
        <div className="my-5 text-center">
            {urlParam}
        </div>
        <div className="my-5 text-center">
            <ButtonAsync className="btn btn-primary" onClick={onNext}>
                Next &gt;
            </ButtonAsync>
        </div>
    </div>;
}

function InvalidPage() {
    return <div className="p-3">
        invalid
    </div>;
}

function ClientForm({ person }: { person: Person; }) {
    let { uqs } = useUqApp();
    async function onSubmit(data: Person) {
        alert('to be implemented');
    }
    return <div className="p-3">
        <Form values={person}>
            <BandIDNOInput label="NO" name="no" ID={uqs.BzWorkshop.Person} />
            <BandString label="First Name" name="firstName" maxLength={100} />
            <BandString label="Last Name" name="lastName" maxLength={100} />
            <BandString label="Middle Name" name="middleName" maxLength={100} />
            <BandString label="Name" name="name" maxLength={100} />
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </Form>
    </div>;
}
