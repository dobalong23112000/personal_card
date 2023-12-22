import React from "react";
import styles from "@pages/Bio/styleNewBio.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
// ví điện tử
import MOMOIMG from "@assets/images/momo.png";
import PAYPALIMG from "@assets/images/paypal.png";
import SHOPEEPAYIMG from "@assets/images/shopeepay.png";
import ZALOPAYIMG from "@assets/images/zalopay.png";
const cx = classNames.bind(styles);

const ButtonWalletDigital = ({
  wallet_digital_type,
  wallet_digital_link,

  name,
}) => {
  let IconComponent = null;

  return (
    <div className={cx("button")}>
      <a
        href={wallet_digital_link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Button className={cx("button-network")}>
          <div className={cx("button-icon")}>
            {IconComponent ? (
              <IconComponent style={{ fontSize: "30px" }} />
            ) : null}
            {wallet_digital_type === "MOMO" && (
              <img src={MOMOIMG} alt="" className={cx("img-bank-render")}></img>
            )}
            {wallet_digital_type === "PAYPAL" && (
              <img
                src={PAYPALIMG}
                alt=""
                className={cx("img-bank-render")}
              ></img>
            )}
            {wallet_digital_type === "SHOPEEPAY" && (
              <img
                src={SHOPEEPAYIMG}
                alt=""
                className={cx("img-bank-render")}
              ></img>
            )}
               {wallet_digital_type === "ZALOPAY" && (
              <img
                src={ZALOPAYIMG}
                alt=""
                className={cx("img-bank-render")}
              ></img>
            )}
          </div>
          <div>
            <b style={{ fontSize: "18px" }}>{name}</b>
          </div>
        </Button>
      </a>
    </div>
  );
};

export default ButtonWalletDigital;
