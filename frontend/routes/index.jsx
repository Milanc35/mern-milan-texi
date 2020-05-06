import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from "react-router-dom";
import Helper from "@/Utils/Helper";
import Layout from "@/components/layout";
import routesConfig from "./routes.config";

const LayoutWithRoute = withRouter(Layout);

class RouterView extends React.Component {
    constructor(props) {
        super(props);
        //const { commonStore } = props;

        //const query = qs.parse(location.search.slice(1));
        //commonStore.setLang(query.langId);
    }

    genRoutes(routes) {
        let result = [];
        Object.values(routes).forEach(route => {
            if (route.children) {
                let routePrefix = Helper.trimRight(route.prefix || "", "/");
                if (routePrefix) {
                    route.children.forEach((item, i) => {
                        const curPath = Helper.trimLeft(item.path || "", "/");
                        item.path = curPath ? (routePrefix + "/" + curPath) : routePrefix;
                    });
                }
                result = result.concat(...route.children);
            }
        });

        return result;
    }

    render() {
        const routes = this.genRoutes(routesConfig);

        return(
            <Router>
            {
              routes.map(({ key, path, component, exact, props }, index) => (
                <Link title={`test-${key}`} key={key} to={path} >
                demo Link[{index}][ {key} ]
                </Link>
            ))
            }
                <LayoutWithRoute>
                    <Switch>
                        { routes.map(({ key, path, component, exact, props }) => (
                            <Route
                                exact={exact || false}
                                key={key}
                                name={key}
                                path={path}
                                component={component}
                                {...props}
                            />
                        ))}
                        <Route path="/*">
                            <h1> Not Found </h1>
                        </Route>
                    </Switch>
                </LayoutWithRoute>
            </Router>
        );
    }
}

export default RouterView;
