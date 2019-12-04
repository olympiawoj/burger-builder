/**
 * @jest-environment node
 */

import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/NavigationItem"
//Instantiate adapter and connect enzyome
configure({ adapter: new Adapter() })

describe('<NavigationItems/>', () => {
    it('should render two NavigationItem elements if not authenticated', () => {
        //Render navItems using enzyme helper, shallow
        debugger;
        const wrapper = shallow(<NavigationItems />)
        //not a JSX element, normal exported function, here chain something to expect call, utility method made avail by Jest. we can expect to find navitem two times if we're not authenticated

        //isAuth will be face bc we're just shallow rendering NavItems, not sending props 
        expect(wrapper.find(NavigationItem)).toHaveLength(2)

    })
})