import React, { useEffect } from "react";

import { useAppDispatch } from "../../../app/hooks";
import {
  CompleteImport,
  Import,
  Organize,
  Tag,
} from "../../../components/Audience/ImportContacts";
import {
  CustomBreadCrumbs,
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import { resetImportContactsState } from "../../../features/audience";
import { useBreadCrumbs } from "../../../hooks";
import { paths } from "../../../services/AppRoutes/paths";
import { useImportContactStyles } from "./useImportContactStyles";

const topBarProps: ITopBarProps = {
  links: [
    { name: "Audience", path: paths.audience },
    { name: "Import Contacts", path: paths.importAudienceContacts },
  ],
};

enum importContactEnum {
  Import = "Import",
  Organize = "Organize",
  Tag = "Tag",
  Complete = "Complete",
}

const breadcrumbValues: string[] = [
  importContactEnum.Import,
  importContactEnum.Organize,
  importContactEnum.Tag,
  importContactEnum.Complete,
];

function ImportContactsPage(): React.ReactElement {
  const classes = useImportContactStyles();

  const { selectedValue, changeSelectValue, switchToSection, getIndex } =
    useBreadCrumbs<typeof importContactEnum>({
      type: importContactEnum,
      initialState: breadcrumbValues,
      value: importContactEnum.Import,
    });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetImportContactsState());
  }, []);

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <PageContainer style={{ paddingBlock: "3em" }}>
          <CustomBreadCrumbs
            values={breadcrumbValues}
            selectedValue={selectedValue}
            onClick={changeSelectValue}
          />
          <div className={classes.wrapper}>
            {selectedValue === getIndex(importContactEnum.Import) && (
              <Import
                switchToSection={() =>
                  switchToSection(importContactEnum.Organize)
                }
              />
            )}

            {selectedValue === getIndex(importContactEnum.Organize) && (
              <Organize
                switchToSection={() => switchToSection(importContactEnum.Tag)}
              />
            )}

            {selectedValue === getIndex(importContactEnum.Tag) && (
              <Tag
                switchToSection={() =>
                  switchToSection(importContactEnum.Complete)
                }
              />
            )}

            {selectedValue === getIndex(importContactEnum.Complete) && (
              <CompleteImport />
            )}
          </div>
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default ImportContactsPage;
