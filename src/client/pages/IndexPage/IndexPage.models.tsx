import { OptionModel } from "../../components/common/Select/Select.models";

export interface IndexPagePropsModel {

}

export interface IndexPageStateModel {
  projects: Array<OptionModel>;
  selectedProject: string;
  redirectPath: string;
}