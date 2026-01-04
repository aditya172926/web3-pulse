import { ArrowLeftIcon } from "./ArrowLeft";
import { ArrowRightIcon } from "./ArrowRight";
import { CheckIcon } from "./CheckIcon";
import { ClockIcon } from "./ClockIcon";
import { CopyToClipboardIcon } from "./CopyToClipboardIcon";
import { CrossIcon } from "./CrossIcon";
import { CubeIcon } from "./CubeIcon";
import { DocumentCheckIcon } from "./DocumentCheck";
import { FireIcon } from "./FireIcon";
import { HashTagIcon } from "./HashtagIcon";
import { TrendUpIcon } from "./TrendUpIcon";
import { IconProps } from "./types";

export const Icons = {
    arrowLeft: ArrowLeftIcon,
    arrowRight: ArrowRightIcon,
    documentCheck: DocumentCheckIcon,
    checkIcon: CheckIcon,
    crossIcon: CrossIcon,
    clockIcon: ClockIcon,
    copyToClipboard: CopyToClipboardIcon,
    hashTag: HashTagIcon,
    cube: CubeIcon,
    fire: FireIcon,
    trendUp: TrendUpIcon
} as const;

export type IconName = keyof typeof Icons;

type AppIconProps = IconProps & {
    name: IconName
}

export function Icon({name, ...props}: AppIconProps) {
    const IconComponent = Icons[name];
    return <IconComponent  {...props}/>
}