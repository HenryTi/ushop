import { useNav, Page, UPage } from "tonwa-page"

export function TrialPage1({ id }: { id: number }) {
    let nav = useNav();
    function onClick() {
        nav.open(<TrialPage2 />);
    }
    return <UPage header="aaa" footer={<div>footer</div>}>
        <div className="p-3">
            trial page id: {id}
            {Array(50).fill(0).map((v, index) => <br key={index} />)}
            <div>
                <button onClick={onClick}>show page</button>
                <button onClick={() => nav.close()}>close me</button>
            </div>
        </div>
    </UPage>
}

function TrialPage2() {
    let nav = useNav();
    return <Page header="trial page 2">
        <div className="p-3">
            trial page 2
            <button onClick={() => nav.close()}>back</button>
            <button onClick={() => nav.open(<TrialPage3 />)}>trial page 3</button>
        </div>
    </Page>;
}

function TrialPage3() {
    let nav = useNav();
    return <Page header="trial page 3">
        <div className="m-5">
            trial page 3
            <button onClick={() => nav.close()}>back</button>
        </div>
        <div>
            <button onClick={() => nav.navigate('logout')}>logout</button>
        </div>
    </Page>;
}
