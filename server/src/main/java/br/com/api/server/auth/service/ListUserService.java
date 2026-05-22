package br.com.api.server.auth.service;

import br.com.api.server.auth.domain.dto.UserDetailsData;
import br.com.api.server.user.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public class ListUserService {

    public UserDetailsData listUser(User user) {
        return new UserDetailsData(user);
    }
}
