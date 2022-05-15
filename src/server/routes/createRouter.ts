import { RequestHandler, Router } from 'express'
import * as itemControllers from '../controllers/item.controllers'

type RouteNameType = `${string}-${APITypes.RequestType}`;
interface RoutesMapModel {
  [route: RouteNameType]: {
    idParamName?: string;
    controller?: RequestHandler;
    controllerData?: {
      StorageClass: any;
      methodData?: CommonModels.MethodData;
    },
    middlewares?: Array<RequestHandler>;
  }
}

const createRouter = (routesMap: RoutesMapModel): Router => {
  const router = Router();
  const createItemControllersMap: {
    [routeType: string]: CommonModels.CreateControllerFunctionType<RequestHandler>
  } = {
    'get': itemControllers.createGetItemController,
    'post': itemControllers.createCreateItemController,
    'patch': itemControllers.createUpdateItemController,
    'put': itemControllers.createUpdateItemController,
    'delete': itemControllers.createDeleteItemController,
  }
  Object.keys(routesMap).forEach(route => {
    const [routeName, routeType] = (route as RouteNameType).split('-');
    const routeData = routesMap[route as RouteNameType];
    router[routeType as APITypes.RequestType](
      routeName,
      ...(routeData.middlewares || []),
      routeData.controller || createItemControllersMap[routeType as APITypes.RequestType](
        routeData.controllerData?.StorageClass!,
        routeData.controllerData?.methodData!,
        { idParamName: routeData.idParamName }
      )
    );
  })
  return router;
}

export default createRouter;