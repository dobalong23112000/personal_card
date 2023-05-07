import React from 'react'
import styles from '@pages/Bio/styleNewBio.module.scss'
import classNames from 'classnames/bind'
import { Button } from 'antd';
import * as AntdIcons from '@ant-design/icons';

const cx = classNames.bind(styles)


const ButtonSaveContact = ({ name, icon, orgInfo, personInfo }) => {
    let IconComponent = null;
    if (icon) {
        IconComponent = AntdIcons[icon];
    }
    const downloadTxtFile = vcfText => {
        const element = document.createElement("a");
        const file = new Blob([vcfText], { type: "text/vcard;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "savecontact.vcf";
        document.body.appendChild(element);
        element.click();
    };
    const CreateVCard = () => {
        var vCardsJS = require("vcards-js");
        var vCard = vCardsJS();

        // Thông tin cá nhân
        vCard.firstName = personInfo.name;
        vCard.lastName = personInfo.lastname;
        vCard.cellPhone = personInfo.phone;
        vCard.email = personInfo.email;
        vCard.url = personInfo.link;
        //Thông tin tổ chức
        vCard.organization = orgInfo.name;
        vCard.workPhone = orgInfo.phone;
        vCard.workEmail = orgInfo.email;
        vCard.role = orgInfo.position;
        return vCard.getFormattedString();
    };
    return (
        <div onClick={() => downloadTxtFile(CreateVCard())} className={cx('button')}>
            <Button className={cx('button-network')}>
                <div className={cx('button-icon')}>
                    {IconComponent ? <IconComponent style={{ fontSize: '30px' }} /> : null}
                </div>
                <div><b style={{fontSize:"18px"}}>{name}</b></div>
            </Button>
        </div>
    )
}

export default ButtonSaveContact