import { RequestHandler, Router } from 'express'
// import * as itemControllers from '../controllers/item.controllers'
import createController from '../controllers/createController'

type RouteNameType = `${string}-${APITypes.RequestType}`;
interface RouteDataModel {
  idParamName?: string;
  controller?: RequestHandler;
  controllerData?: {
    StorageClass: any;
    methodData?: ControllerTypes.MethodData;
    dataType?: ListAndItemTypes.DataType
  },
  middlewares?: Array<RequestHandler>;
}
interface RoutesMapModel {
  '/'?: RouteDataModel;
  [route: RouteNameType]: RouteDataModel;
}

const createRouter = (routesMap: RoutesMapModel): Router => {
  const router = Router();
  Object.keys(routesMap).forEach(route => {
    const [routeName, routeType = 'post'] = (route as RouteNameType).split('-');
    const routeData = routesMap[route as RouteNameType];
    router[routeType as APITypes.RequestType](
      routeName,
      ...(routeData.middlewares || []),
      routeData.controller || createController({
        requestType: routeType as APITypes.RequestType,
        StorageClass: routeData.controllerData?.StorageClass!,
        dataType: routeData.controllerData?.dataType,
        methodData: routeData.controllerData?.methodData!,
        optionalData: { idParamName: routeData.idParamName }
      })
    );
  })
  return router;
}

export default createRouter;