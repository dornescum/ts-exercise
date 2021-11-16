import React, {ReactElement, ReactNode, useState} from 'react';
import './App.css';

const Heading = ({title}: { title?: string }) => {
    return <h1>{title}</h1>
}
const HeadingWithContent = ({children}: { children?: ReactNode }): ReactElement | null => {
    return <h3>{children}</h3>
}
// defaltProps
const defaultContainerProps = {
    heading: <strong>default Container Props</strong>
}
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;
const Container = ({heading, children}: ContainerProps): ReactElement | null => {
    return (
        <div id='container'>
            <h5 id='heading-container'>
                {heading}
            </h5>
            <div id='children-div'>
                {children}
            </div>
        </div>
    )
}
Container.defaultProps = defaultContainerProps;
// functionalProps
const TextWithNumber = ({header, children}: {
    header?: (num: number) => ReactNode;
    children: (num: number) => ReactNode
}) => {
    const [state, setState] = useState<number>(1);
    return (
        <div>
            {header && <h2>{header?.(state)} </h2>}
            <div>{children(state)}</div>
            <div>
                <button onClick={() => setState(state + 1)}> Add</button>
            </div>
        </div>
    )
}
// =============
// List

function List<ListItem>({items, render}: { items: ListItem[], render: (item: ListItem) => ReactNode }) {
    return (
        <ul>
            {items.map((item, index) => {
               return <li key={index}>{render(item)}</li>
            })}
        </ul>
    )
}

function App() {
    return (
        <div>
            <Heading title={'some title'}/>
            <HeadingWithContent>Children</HeadingWithContent>
            <Container>
                <h5>
                    Container text; heading with default props
                </h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, quis?</p>
            </Container>
            <TextWithNumber header={(num: number) => <span>original value {num}</span>}>{(num: number) => <div>Today's
                number is {num}</div>}</TextWithNumber>
            <List items={["Mihai", "Raluca", "ceva"]} render={(item: string) => <div>{item.toLocaleUpperCase()}</div>}></List>
            <List items={['1','2','3']} render={(item:string)=><div>{item}</div>}></List>
        </div>
    );
}

export default App;
