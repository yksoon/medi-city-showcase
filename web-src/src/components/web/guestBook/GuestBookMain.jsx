import React from "react";

const GuestBookMain = () => {
    return (
        <div id="guest">
            <div id="guest_book">
                <div>
                    <div class="signup">
                        <div class="boxing">
                            <table>
                                <colgroup>
                                    <col width="30%"/>
                                    <col width="*"/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>NAME</th>
                                        <td><input type="text" value="" name="" required /></td>
                                    </tr>
                                    <tr>
                                        <th>TEL</th>
                                        <td>
                                            <input type="text" value="" name="" class="input_m" required/>&nbsp;-&nbsp;
                                            <input type="text" value="" name="" class="input_m" required/>&nbsp;-&nbsp;
                                            <input type="text" value="" name="" class="input_m" required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>E-MAIL</th>
                                        <td><input type="text" name="" required /></td>
                                    </tr>
                                    <tr>
                                        <th>AFFILIATION</th>
                                        <td>
                                            <input type="text" value="" name="" class="" placeholder="" required/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="btn_box">
                            <input type="submit" value="SUBMIT" name=""/>
                        </div>
                </div>

                </div>
           </div>
        </div>
    );
};

export default GuestBookMain;
