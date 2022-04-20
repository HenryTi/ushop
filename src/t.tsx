interface Props {
    children: React.ReactNode;
}

export function Layout(props: Props) {
    return <div>
        <div>header</div>
        {props.children}
        <div>footer</div>
    </div>
}
