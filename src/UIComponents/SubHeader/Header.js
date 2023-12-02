import { Skeleton } from "@mui/material";
import HeaderActivateButton from "./HeaderActivateButton";
import HeaderAddButton from "./HeaderAddButton";
import HeaderDeactiveButton from "./HeaderDeactiveButton";
import HeaderDeleteButton from "./HeaderDeleteButton";
import HeaderEditButton from "./HeaderEditButton";
import HeaderRefreshButton from "./HeaderRefreshButton";
import HeaderReviewButton from "./HeaderReviewButton";
import SearchBar from "./SearchBar";
import HeaderDesignButton from "./HeaderDesignButton";
import HeaderCopyButton from "./HeaderCopyButton";
import HeaderPermissionButton from "./HeaderPermission";
import HeaderProjectFileButton from "./HeaderProjectFile";
import HeaderBackupNowButton from "./HeaderBackuNow";
import HeaderBackupSettingButton from "./HeaderBackupSetting";
import HeaderBackupScheduleButton from "./HeaderBackupSchedule";
import HeaderProjectDataBase from "./HeaderProjectDatabase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import HeaderReportButton from "./HeaderReportButton.js";

export default function Header({ show,
  onAdd,
  onEdit,
  onSearch,
  onSearchClick,
  onDeactivate,
  onActivate,
  onDelete,
  onBackupNow,
  onRefresh,
  onProjectFile,
  onPermission,
  onBackupSetting,
  onBackupSchedule,
  onProjectDB,
  isItemSelected,
  isLoading,
  extendSearchBox,
  dontCloseOnClick,
  onReview,
  closingParam,
  hideStatusSearch,
  title,
  onCopy,
  activeStatus,
  hideTextBox,
  rightSideButtons,
  searchStatusModifier,
  onReportButtomClick,
  children, initialSearchValue, onDesign, showSearch }) {

  return (
    <div className="bg-white  flex items-center justify-between py-2 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-[7px]">
      {!isLoading && (
        <div className="flex gap-x-[5px]">

          {show.add && (
            <HeaderAddButton onAdd={onAdd} title={"Add "} />
          )}

          {show.edit && (
            <HeaderEditButton onEdit={onEdit} isItemSelected={isItemSelected} title={"Edit"} />
          )}

          {show.active && (
            <HeaderActivateButton onActivate={onActivate} isItemSelected={isItemSelected} title={"Active"} />
          )}

          {show.deactive && (
            <HeaderDeactiveButton onDeactivate={onDeactivate} isItemSelected={isItemSelected} title={"Deactive"} />
          )}

          {show.review && (
            <HeaderReviewButton onReview={onReview} isItemSelected={isItemSelected} title={"Review"} />
          )}

          {show.copy && (
            <HeaderCopyButton onCopy={onCopy} isItemSelected={isItemSelected} title={"Copy"} />
          )}

          {show.design && (
            <HeaderDesignButton onDesign={onDesign} isItemSelected={isItemSelected} title={"Design"} />
          )}

          {show.permission && (
            <HeaderPermissionButton onPermission={onPermission} isItemSelected={isItemSelected} title={"Permission"} />
          )}

          {show.delete && (
            <HeaderDeleteButton onDelete={onDelete} isItemSelected={isItemSelected} title={"Delete"} />
          )}

          {show.refresh && (
            <HeaderRefreshButton onRefresh={onRefresh} title={"Refresh"} />
          )}

          {show.backupNow && (
            <HeaderBackupNowButton onBackupNow={onBackupNow} isItemSelected={isItemSelected} title={"BackupNow"} />
          )}

          {show.backupSetting && (
            <HeaderBackupSettingButton onBackupSetting={onBackupSetting} isItemSelected={isItemSelected} title={"BackupSetting"} />
          )}

          {show.backupSchedule && (
            <HeaderBackupScheduleButton onBackupSchedule={onBackupSchedule} isItemSelected={isItemSelected} title={"BackupSchedule"} />
          )}
          {show.projectDB && (
            <HeaderProjectDataBase onProjectDB={onProjectDB} isItemSelected={isItemSelected} title={"ProjectDB"} />
          )}

          {show.projectFile && (
            <HeaderProjectFileButton onProjectFile={onProjectFile} isItemSelected={isItemSelected} title={"Project Wise"} />
          )}

        </div>
      )}

      {isLoading && (
        <div className="flex gap-x-[5px]">

          <Skeleton variant="rounded" width={37} height={37} />

          <Skeleton variant="rounded" width={37} height={37} />

          <Skeleton variant="rounded" width={37} height={37} />

          <Skeleton variant="rounded" width={37} height={37} />

          <Skeleton variant="rounded" width={37} height={37} />

          <Skeleton variant="rounded" width={37} height={37} />

        </div>
      )}
      <div>
        {children}

      </div>

      {!isLoading && (
        <div className="max-[767px]:mb-[10px] flex gap-1 max-[767px]:flex max-[767px]:justify-end max-[767px]:w-full">
          {
            rightSideButtons &&
            <>
              {
                rightSideButtons.reportButton && (
                  <HeaderReportButton onReportButtomClick={onReportButtomClick}  title={"Reports"}/>
                )
              }
            </>
          }



          {
            extendSearchBox ?
              <SearchBar
                onSearch={onSearch}
                onSearchClick={onSearchClick}
                dontCloseOnClick={dontCloseOnClick}
                closingParam={closingParam}
                initialSearchValue={initialSearchValue}
                searchStatusModifier={searchStatusModifier}
                activeStatus={activeStatus}
                hideTextBox={hideTextBox}
                hideStatusSearch={hideStatusSearch}
                showSearch={showSearch}
              >
                {extendSearchBox}
              </SearchBar>
              :
              <SearchBar
                onSearch={onSearch}
                onSearchClick={onSearchClick}
                initialSearchValue={initialSearchValue}
                searchStatusModifier={searchStatusModifier}
                activeStatus={activeStatus}
                hideTextBox={hideTextBox}
                hideStatusSearch={hideStatusSearch}
              />}


        </div>
      )}

      {isLoading && (
        <Skeleton variant="rectangular" width={223} height={34} />
      )}


    </div>
  )
}